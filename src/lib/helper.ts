export function emailFormatter(email: string): boolean {
  if (!email) return false;

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return false;
  }
  return true;
}

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
