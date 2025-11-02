"use client";

import React from "react";
import { Job } from "../../types";
import { useJobs } from "../../hooks";

interface AdminJobListContext {
  jobs: Job[];
  isLoading: boolean;
  error?: {
    message: string;
  } | null;
  onQueryChange: (query: string) => void;
}

export const adminJobListContext = React.createContext<AdminJobListContext>({
  jobs: [],
  isLoading: false,
  onQueryChange: () => {},
});

export function AdminJobListProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [query, onQueryChange] = React.useState("");
  const { data: jobs = [], error, isLoading } = useJobs({ query });

  return (
    <adminJobListContext.Provider
      value={{ jobs, isLoading, error, onQueryChange }}
    >
      {children}
    </adminJobListContext.Provider>
  );
}
