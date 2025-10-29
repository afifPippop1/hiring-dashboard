"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { createTFJSHandDetector } from "@/lib/tf-handpose";
import { Keypoint } from "@tensorflow-models/hand-pose-detection";

export default function GestureCamera() {
  const webcamRef = useRef<Webcam>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    (async () => {
      const detector = await createTFJSHandDetector();

      interval = setInterval(async () => {
        if (!webcamRef.current?.video) return;

        const hands = await detector.estimateHands(
          webcamRef.current.video as HTMLVideoElement
        );

        if (hands.length > 0) {
          const landmarks = hands[0].keypoints3D ?? [];
          const raisedFingers = detectRaisedFingers(landmarks);

          let lastCaptureTime = 0;
          const CAPTURE_COOLDOWN = 3000; // 3 seconds

          if (raisedFingers === 3) {
            const now = Date.now();
            if (now - lastCaptureTime > CAPTURE_COOLDOWN) {
              lastCaptureTime = now;
              const screenshot = webcamRef.current.getScreenshot();
              if (screenshot) setPhoto((photo) => photo ?? screenshot);
            }
          }
        }
      }, 500);
    })();

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      {/* {photo && <img src={photo} alt="Captured" />} */}
    </div>
  );
}

function detectRaisedFingers(landmarks: Keypoint[]): number {
  console.log(landmarks);
  // Simple placeholder logic — you can improve based on Y-coordinate of tips
  // (e.g. compare each fingertip with its base joint)
  return 3; // mock always 3 for now
}
