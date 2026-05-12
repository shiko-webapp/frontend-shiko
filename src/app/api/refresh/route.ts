export async function POST() {
  const res = await fetch(
    `${process.env.AUTHSERVICE_URL}/auth/refresh`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const response = Response.json(await res.json());

  const cookie = res.headers.get("set-cookie");
  if (cookie) response.headers.set("set-cookie", cookie);

  return response;
}