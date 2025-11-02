"use client";

import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function GestureCamera({
  onChange,
}: {
  onChange: (photo: string) => void;
}) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        if (
          ctx.canvas.width !== video.videoWidth ||
          ctx.canvas.height !== video.videoHeight
        ) {
          ctx.canvas.width = video.videoWidth;
          ctx.canvas.height = video.videoHeight;
        }

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const results = await detector.detectForVideo(video, Date.now());

        if (!results.landmarks || results.landmarks.length === 0) return;

        const landmarks = results.landmarks[0];
        const boundingBox = getBoundingBox(landmarks, ctx.canvas);

        const raisedFingers = detectRaisedFingers(landmarks);
        const isCorrectPose = raisedFingers <= 4 && raisedFingers > 1;

        drawBoundingBox(ctx, boundingBox, isCorrectPose);

        if (poseStep === 3 && raisedFingers === 3) {
          setPoseStep(2);
        } else if (poseStep === 2 && raisedFingers <= 2) {
          setPoseStep(1);

          const now = Date.now();
          if (now - lastCaptureTime > CAPTURE_COOLDOWN) {
            lastCaptureTime = now;
            startCountdownAndCapture();
          }
        }
      }, 500);
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
          if (screenshot) onChange(screenshot);
          setPoseStep(3);
          setTimeout(() => setIsCapturing(false), 2000);
        } else {
          setCountdown(count);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [poseStep, isCapturing, onChange]);

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
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center bg-black/40 text-white text-6xl font-bold">
          <p className="text-md">Capturing in:</p>
          {countdown}
        </div>
      )}
    </div>
  );
}

function getBoundingBox(
  landmarks: { x: number; y: number }[],
  canvas: HTMLCanvasElement
) {
  const xs = landmarks.map((p) => p.x * canvas.width);
  const ys = landmarks.map((p) => p.y * canvas.height);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);
  let x = Math.floor(minX - 10);
  let y = Math.floor(minY - 10);
  let width = Math.ceil(maxX - minX + 20);
  let height = Math.ceil(maxY - minY + 20);
  x = Math.max(0, x);
  y = Math.max(0, y);
  width = Math.min(canvas.width - x, width);
  height = Math.min(canvas.height - y, height);
  return { x, y, width, height };
}

function drawBoundingBox(
  ctx: CanvasRenderingContext2D,
  box: { x: number; y: number; width: number; height: number },
  isCorrect: boolean
) {
  ctx.fillStyle = isCorrect
    ? "rgba(67, 147, 108, 0.3)"
    : "rgba(255, 20, 40, 0.3)";
  ctx.strokeStyle = isCorrect ? "#43936c" : "#e11428";
  ctx.lineWidth = 4;
  ctx.fillRect(box.x, box.y, box.width, box.height);
  ctx.strokeRect(box.x, box.y, box.width, box.height);
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
