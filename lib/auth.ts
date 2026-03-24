import crypto from "crypto";

export const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION = 7 * 24 * 60 * 60; // 7 days in seconds

export function validatePassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return password === adminPassword;
}

export function createSessionValue(): string {
  const token = crypto.randomBytes(32).toString("hex");
  const signature = crypto
    .createHmac("sha256", process.env.ADMIN_PASSWORD || "")
    .update(token)
    .digest("hex");
  return `${token}.${signature}`;
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_DURATION,
};
