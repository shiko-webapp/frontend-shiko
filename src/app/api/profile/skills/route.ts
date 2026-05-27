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

export async function POST(req: Request) {
  const body = await req.json();
  const backendRes = await fetch(
    `${process.env.SKILLS_API_URL}/api/skills`,
    {
      method: "POST",
      headers: {
        cookie: req.headers.get("cookie") || "",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
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

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const backendRes = await fetch(
    `${process.env.SKILLS_API_URL}/api/skills/${id}`,
    {
      method: "DELETE",
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