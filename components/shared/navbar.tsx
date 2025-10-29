"use client";

import { useParams, useSelectedLayoutSegment } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";
import { Logo } from "../ui/logo";

export function Navbar() {
  const params = useParams<{ jobId?: string }>();
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="h-16 bg-neutral-10 border border-[#EFEEEE] shadow-button flex items-center justify-between p-6">
      <section className="flex items-center justify-center gap-6">
        <Logo />
        {segment === "jobs" && (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/jobs">
                    <Button variant="outline" size="sm">
                      Job list
                    </Button>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {params.jobId && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Button variant="outline" size="sm" disabled>
                        Manage Candidate
                      </Button>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </section>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  );
}
