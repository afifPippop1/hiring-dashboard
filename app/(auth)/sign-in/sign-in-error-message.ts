export function getSignInErrorMessage(message: string): string {
  if (message === "Invalid login credentials") {
    return "Email atau password salah";
  }

  return message;
}
