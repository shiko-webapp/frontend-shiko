export async function GET(req: Request) {
  const backendRes = await fetch(
    `${process.env.PROFILE_API_URL}/api/profile`,
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