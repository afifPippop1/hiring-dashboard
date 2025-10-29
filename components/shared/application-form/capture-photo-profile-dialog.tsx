import { ChevronRightIcon } from "@/components/icons/chevron-right";
import GestureCamera from "@/components/shared/gesture-camera";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getHandposeAsset } from "@/lib/utils";
import Image from "next/image";

export function CapturePhotoProfileDialog(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog {...props}>
      <DialogContent className="md:max-w-[637] w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Raise Your Hand to Capture
          </DialogTitle>
          <p className="text-sm">
            We&apos;ll take the photo once your hand pose is detected
          </p>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <GestureCamera />
          <p className="text-sm">
            To take a picture, follow the hand poses in the order shown below.
            The system will automatically capture the image once the final pose
            is detected.
          </p>
          {/* Gesture demonstration */}
          <section className="flex items-center gap-2 justify-center">
            <GestureDemonstrationBox pose={1} />
            <ChevronRightIcon />
            <GestureDemonstrationBox pose={2} />
            <ChevronRightIcon />
            <GestureDemonstrationBox pose={3} />
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function GestureDemonstrationBox({ pose }: { pose: 1 | 2 | 3 }) {
  return (
    <div className="bg-[#F6F1EB] w-[57.26px] h-[57.26px] flex items-center justify-center">
      <Image
        src={getHandposeAsset(pose)}
        alt="handpose"
        width={17.53}
        height={44.99}
      />
    </div>
  );
}
