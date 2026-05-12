import { requireUser } from "@/src/lib/auth";

export default async function Home() {
  const user = await requireUser();
  console.log(user)
  return (
    <main className="flex items-center justify-center flex-col gap-5 w-full h-dvh">
      <h1>Detta är en h1</h1>
      <h2></h2>
      <button className="btn btn-lg btn-primary">Kolla en knapp</button>
    </main>
  );
}
