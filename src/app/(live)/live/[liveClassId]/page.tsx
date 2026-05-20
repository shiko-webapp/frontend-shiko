import { requireUser } from "@/src/lib/auth";
import LiveClassChat from "./LiveClassChat";

interface PageProps {
    params: Promise<{ liveClassId: string }>;
}

export default async function Page({ params }: PageProps) {
    const user = await requireUser();
    const { liveClassId } = await params;

    return (
        <LiveClassChat
            liveClassId={parseInt(liveClassId)}
            userId={user.id}
        />
    );
}