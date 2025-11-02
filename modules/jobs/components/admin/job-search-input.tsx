"use client";

import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { debounce } from "lodash";
import { Search, X } from "lucide-react";
import React from "react";
import { useAdminJobList } from "../../hooks";

export function JobSearchInput() {
  const { onQueryChange } = useAdminJobList();
  const [searchParams, setSearchParams] = React.useState("");

  const debouncedSearch = React.useMemo(
    () =>
      debounce((value: string) => {
        onQueryChange(value);
      }, 500),
    [onQueryChange]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(event.target.value);
    debouncedSearch(event.target.value);
  };

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  function clearSearch() {
    setSearchParams("");
    onQueryChange("");
  }

  return (
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
  );
}
