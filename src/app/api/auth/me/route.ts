
export async function GET(req: Request) {
  const backendRes = await fetch(
    `${process.env.AUTHSERVICE_URL}/me`,
    {
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
      cache: "no-store",
    }
  );

  return new Response(backendRes.body, {
    status: backendRes.status,
    headers: {
      "content-type":
        backendRes.headers.get("content-type") || "application/json",
    },
  });
}