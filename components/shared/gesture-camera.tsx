"use client";

import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function GestureCamera() {
  const webcamRef = useRef<Webcam>(null);
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
        if (!results.landmarks || results.landmarks.length === 0) return;

        const landmarks = results.landmarks[0];
        const raisedFingers = detectRaisedFingers(landmarks);

        // Pose detection sequence 3 → 2 → 1
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
      }, 300);
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
      />

      {/* Countdown overlay */}
      {countdown && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-6xl font-bold transition-all duration-300">
          {countdown}
        </div>
      )}

      <p className="text-sm text-neutral-600 mt-2">
        Pose {poseStep} → show next pose ({poseStep - 1})
      </p>

      {photo && (
        <div className="mt-2">
          <img
            src={photo}
            alt="Captured"
            className="rounded-md border w-40 h-40 object-cover"
          />
        </div>
      )}
    </div>
  );
}

/**
 * Detect number of raised fingers from hand landmarks
 */
function detectRaisedFingers(landmarks: { x: number; y: number }[]): number {
  const validLandmarks = landmarks.filter((p) => p.x != null && p.y != null);
  if (validLandmarks.length < 21) return 0;

  const fingers = [
    { tip: 4, base: 2 }, // thumb
    { tip: 8, base: 5 }, // index
    { tip: 12, base: 9 }, // middle
    { tip: 16, base: 13 }, // ring
    { tip: 20, base: 17 }, // pinky
  ];

  let count = 0;
  for (const f of fingers) {
    const tip = landmarks[f.tip];
    const base = landmarks[f.base];
    if (tip && base && tip.y < base.y) {
      count++;
    }
  }

  return count;
}
