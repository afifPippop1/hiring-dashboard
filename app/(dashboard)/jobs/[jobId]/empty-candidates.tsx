import { EMPTY_CANDIDATES_ASSET } from "@/lib/assets";
import Image from "next/image";

export function EmptyCandidates() {
  return (
    <div className="flex-1 flex items-center justify-center rounded-md border border-neutral-40 shadow-[#0000001A]">
      <div className="flex flex-col">
        <Image
          src={EMPTY_CANDIDATES_ASSET}
          alt="empty-candidate-list"
          width={306}
          height={300}
          loading="eager"
        />

        <section className="text-center">
          <h1 className="text-lg font-bold text-neutral-90">
            No job openings available
          </h1>
          <p className="text-md text-neutral-70">
            Create a job opening now and start the candidate process.
          </p>
        </section>
      </div>
    </div>
  );
}
