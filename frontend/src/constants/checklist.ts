export const CHECKLIST_STEPS = [
  "All relevant GitHub pull requests have been merged",
  "CHANGELOG.md files have been updated",
  "All tests are passing",
  "Releases in GitHub created",
  "Deployed in demo",
  "Tested thoroughly in demo",
  "Deployed in production",
] as const;

export const DEFAULT_STEPS_COUNT = CHECKLIST_STEPS.length;
