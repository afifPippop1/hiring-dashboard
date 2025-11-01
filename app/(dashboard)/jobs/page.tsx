"use client";

import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useJobs } from "@/hooks/use-jobs";
import { debounce } from "lodash";
import { Search, X } from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { CreateJobCard } from "./create-job-card";
import { EmptyJobList } from "./empty-job-list";
import { JobCard, JobCardSkeleton } from "./job-card";

export default function Jobspage() {
  const [searchParams, setSearchParams] = useState("");
  const [query, setQuery] = useState("");
  const jobs = useJobs({ query });

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
      }, 500),
    []
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(event.target.value);
    debouncedSearch(event.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  function clearSearch() {
    setSearchParams("");
    setQuery("");
  }

  return (
    <div className="flex items-start gap-6">
      <div className="flex-1 flex flex-col items-stretch gap-4">
        <InputGroup className="bg-neutral-10">
          <InputGroupInput
            onChange={handleChange}
            value={searchParams}
            placeholder="Search for jobs"
          />
          {searchParams.length > 0 ? (
            <InputGroupButton onClick={clearSearch}>
              <X />
            </InputGroupButton>
          ) : (
            <InputGroupButton>
              <Search />
            </InputGroupButton>
          )}
        </InputGroup>
        {!jobs.data?.length && !jobs.isLoading && <EmptyJobList />}
        {jobs.isLoading && [1, 2, 3].map((i) => <JobCardSkeleton key={i} />)}
        {jobs.data?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <div className="sticky top-0 self-start">
        <CreateJobCard />
      </div>
    </div>
  );
}
