import Image from "next/image";
import React from "react";

export function EmptyState({
  children,
  src,
  title,
  description,
}: {
  children?: React.ReactNode;
  src: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={src}
          alt="empty-job-list"
          width={306}
          height={300}
          loading="eager"
        />
        <section className="text-center">
          <h1 className="text-heading-sm font-bold text-neutral-90">{title}</h1>
          <p className="text-lg text-neutral-90">{description}</p>
        </section>
        {children}
      </div>
    </div>
  );
}
