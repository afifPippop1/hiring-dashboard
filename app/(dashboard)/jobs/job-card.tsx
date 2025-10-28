import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Job } from "@/lib/job/job.schema";
import { formatMinMaxSalary } from "@/lib/utils";
import dayjs from "dayjs";
import Link from "next/link";

export function JobCard({ job }: { job: Job }) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <Badge>{job.status}</Badge>
          <Badge variant="outline">
            started on {dayjs(job.createdAt).format("D MMM YYYY")}
          </Badge>
        </div>
        <h1 className="font-bold text-xl">{job.title}</h1>
        <div className="mt-2 flex gap-2">
          <section className="flex-1">
            <p className="text-lg">
              {formatMinMaxSalary({ min: job.minSalary, max: job.maxSalary })}
            </p>
          </section>
          <Link href={`/jobs/${job.id}`}>
            <Button size="sm" type="button">
              Manage Job
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
