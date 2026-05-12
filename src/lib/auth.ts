import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireUser() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    "https://aspnet2-authservice.onrender.com/me",
    {
      method: "GET",
      cache: "no-store",
      headers: {
        cookie: cookieHeader,
      },
    }
    );
    
 if (!res.ok) {
    redirect("/login");
  }

  return await res.json();
}