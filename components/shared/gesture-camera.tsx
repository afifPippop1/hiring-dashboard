"use client";

import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function GestureCamera() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [poseStep, setPoseStep] = useState(3);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const detectorRef = useRef<HandLandmarker | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let lastCaptureTime = 0;
    const CAPTURE_COOLDOWN = 5000; // ms

    (async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.12/wasm"
      );

      detectorRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        },
        runningMode: "VIDEO",
        numHands: 1,
      });

      interval = setInterval(async () => {
        if (!webcamRef.current?.video || isCapturing) return;
        const video = webcamRef.current.video as HTMLVideoElement;
        if (!video || video.readyState !== 4) return;

        const detector = detectorRef.current;
        if (!detector) return;

        const results = await detector.detectForVideo(video, Date.now());
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        // Clear the canvas each frame
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        if (!results.landmarks || results.landmarks.length === 0) return;

        const landmarks = results.landmarks[0];
        const boundingBox = getBoundingBox(landmarks, video);

        const raisedFingers = detectRaisedFingers(landmarks);
        const isCorrectPose =
          (poseStep === 3 && raisedFingers === 2) ||
          (poseStep === 2 && raisedFingers <= 1);

        drawBoundingBox(ctx, boundingBox, isCorrectPose);

        // Draw small circles on fingertips
        drawLandmarks(ctx, landmarks, isCorrectPose);

        // Pose sequence logic
        if (poseStep === 3 && raisedFingers === 2) {
          setPoseStep(2);
        } else if (poseStep === 2 && raisedFingers <= 1) {
          setPoseStep(1);

          const now = Date.now();
          if (now - lastCaptureTime > CAPTURE_COOLDOWN) {
            lastCaptureTime = now;
            startCountdownAndCapture();
          }
        }
      }, 200);
    })();

    async function startCountdownAndCapture() {
      setIsCapturing(true);
      let count = 3;
      setCountdown(count);

      const timer = setInterval(() => {
        count -= 1;
        if (count === 0) {
          clearInterval(timer);
          setCountdown(null);
          const screenshot = webcamRef.current?.getScreenshot();
          if (screenshot) setPhoto(screenshot);
          setPoseStep(3);
          setTimeout(() => setIsCapturing(false), 2000);
        } else {
          setCountdown(count);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [poseStep, isCapturing]);

  return (
    <div className="relative flex flex-col items-center">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-md"
        videoConstraints={{ facingMode: "user" }}
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full rounded-md pointer-events-none"
      />

      {countdown && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-6xl font-bold">
          {countdown}
        </div>
      )}

      <p className="text-sm text-neutral-600 mt-2">
        Pose {poseStep} → show next pose ({poseStep - 1})
      </p>

      {/* {photo && (
        <div className="mt-2">
          <img
            src={photo}
            alt="Captured"
            className="rounded-md border w-40 h-40 object-cover"
          />
        </div>
      )} */}
    </div>
  );
}

// === Helper functions ===

function getBoundingBox(
  landmarks: { x: number; y: number }[],
  video: HTMLVideoElement
) {
  const xs = landmarks.map((p) => p.x * video.videoWidth);
  const ys = landmarks.map((p) => p.y * video.videoHeight);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

function drawBoundingBox(
  ctx: CanvasRenderingContext2D,
  box: { x: number; y: number; width: number; height: number },
  isCorrect: boolean
) {
  ctx.strokeStyle = isCorrect ? "lime" : "red";
  ctx.lineWidth = 4;
  ctx.strokeRect(box.x, box.y, box.width, box.height);
}

function drawLandmarks(
  ctx: CanvasRenderingContext2D,
  landmarks: { x: number; y: number }[],
  isCorrect: boolean
) {
  ctx.fillStyle = isCorrect ? "lime" : "red";
  for (const p of landmarks) {
    ctx.beginPath();
    ctx.arc(p.x * ctx.canvas.width, p.y * ctx.canvas.height, 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function detectRaisedFingers(landmarks: { x: number; y: number }[]): number {
  const fingers = [
    { tip: 4, base: 2 },
    { tip: 8, base: 5 },
    { tip: 12, base: 9 },
    { tip: 16, base: 13 },
    { tip: 20, base: 17 },
  ];
  let count = 0;
  for (const f of fingers) {
    const tip = landmarks[f.tip];
    const base = landmarks[f.base];
    if (tip && base && tip.y < base.y) count++;
  }
  return count;
}
