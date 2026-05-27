export async function POST(req: Request) {
    const formData = await req.formData();

    const backendRes = await fetch(`${process.env.FILEHANDLER_API_URL}/api/files/upload`,
        {
            method: "POST",
            headers: {
                cookie: req.headers.get("cookie") || "",
            },
            body: formData, 
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
  const { fileName } = await req.json();
  const backendRes = await fetch(
    `${process.env.FILEHANDLER_API_URL}/api/files/${fileName}`,
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