
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function callMe(cookieHeader: string) {
  return fetch(`${process.env.AUTHSERVICE_URL}/me`, {
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  });
}

async function callRefresh(cookieHeader: string) {
  return fetch(`${process.env.AUTHSERVICE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      cookie: cookieHeader,
    },
  });
}

export async function requireUser() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  // 1. Try normal request
  let res = await callMe(cookieHeader);

  if (res.ok) {
    return res.json();
  }

  // 2. If expired → refresh
  if (res.status === 401) {
    const refreshRes = await callRefresh(cookieHeader);

    if (!refreshRes.ok) {
      redirect("/login");
    }

    // IMPORTANT: retry /me after refresh
    res = await callMe(cookieHeader);

    if (res.ok) {
      return res.json();
    }
  }

  // 3. Fallback → login
  redirect("/login");
}