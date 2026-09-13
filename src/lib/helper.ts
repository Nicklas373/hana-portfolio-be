export function errorFormatter(err: unknown): string {
  if (typeof err === "string") {
    return err.replace(/"/g, "");
  }

  if (err instanceof Error) {
    return err.message.replace(/"/g, "");
  }

  try {
    return JSON.stringify(err).replace(/"/g, "");
  } catch {
    return "Fail to parse error message :(";
  }
}
