export async function GET(req: Request) {
  const backendRes = await fetch(
    `${process.env.SKILLS_API_URL}/api/skills`,
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