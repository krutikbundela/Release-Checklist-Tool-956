export function computeStatus(steps: boolean[]): string {
  if (steps.every((step) => !step)) return "planned";
  if (steps.every((step) => step)) return "done";
  return "ongoing";
}
