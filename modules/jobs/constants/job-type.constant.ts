const JOB_TYPE = {
  Fulltime: "Full-time",
  Contract: "Contract",
  Parttime: "Part-time",
  Internship: "Internship",
  Freelance: "Freelance",
} as const;

export const JOB_TYPE_ENUM = [
  JOB_TYPE.Fulltime,
  JOB_TYPE.Contract,
  JOB_TYPE.Parttime,
  JOB_TYPE.Internship,
  JOB_TYPE.Freelance,
] as const;
