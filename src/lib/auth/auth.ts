import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireUser() {
  const cookieHeader = (await cookies())
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.AUTHSERVICE_URL}/me`,
    {
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}