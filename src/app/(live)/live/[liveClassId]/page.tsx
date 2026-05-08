import ChatPanel from "@/src/features/live/components/ChatPanel";
import VideoPlayer from "@/src/features/live/components/VideoPlayer";

export default async function LiveClassChat({ params }: { params: { id: string } }) {
    const { id } = await params;
    const liveClassId = Number(id);

    return (
        <main className="flex items-center justify-center flex-col w-full h-dvh">
            <div className="flex gap-6">
                <VideoPlayer />
                <ChatPanel liveClassId={liveClassId} />
            </div>

        </main>
    )
}