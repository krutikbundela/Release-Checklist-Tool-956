export const ReleaseStatus = {
  Done: "done",
  Ongoing: "ongoing",
  Planned: "planned",
} as const;

export const statusColorMap: Record<string, "success" | "warning" | "default"> = {
  [ReleaseStatus.Done]: "success",
  [ReleaseStatus.Ongoing]: "warning",
  [ReleaseStatus.Planned]: "default",
};
