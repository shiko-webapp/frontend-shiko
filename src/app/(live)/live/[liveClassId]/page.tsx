import ChatPanel from "@/src/features/live/components/ChatPanel";
import VideoPlayer from "@/src/features/live/components/VideoPlayer";

export default async function LiveClassChat({
    params
}: {
    params: Promise<{ liveClassId: string }>
}) {
    const { liveClassId } = await params;
    const id = Number(liveClassId);

    return (
        <main className="flex items-center justify-center flex-col w-full h-dvh">
            <div className="flex gap-6">
                <VideoPlayer />
                <ChatPanel liveClassId={id} />
            </div>

        </main>
    )
}