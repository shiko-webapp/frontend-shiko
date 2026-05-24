export async function apiFetch(
  input: RequestInfo,
  init?: RequestInit
) {
  const res = await fetch(input, {
    ...init,
    credentials: "include",
  });

  
  // // access token expired/missing
  // if (res.status === 401) {
  //   console.log("Attempting refresh...");

  //   const refreshRes = await fetch("/api/auth/refresh", {
  //     method: "POST",
  //     credentials: "include",
  //   });

  //   if (!refreshRes.ok) {
  //     window.location.href = "/login";
  //     throw new Error("Refresh failed");
  //   }

  //   // retry original request
  //   res = await fetch(input, {
  //     ...init,
  //     credentials: "include",
  //   });
  // }

  return res;
}