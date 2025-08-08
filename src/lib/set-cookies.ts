"use server";

import { cookies } from "next/headers";

export async function setSessionCookie(session: string) {
  cookies().set({
    name: "session",
    value: session,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
}

export async function removeSessionCookie() {
  cookies().delete("session");
}
