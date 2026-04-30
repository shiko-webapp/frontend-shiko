import ChatPanel from "@/src/features/live/components/ChatPanel";
import VideoPlayer from "@/src/features/live/components/VideoPlayer";


export default function LivePage() {
    return (
        <main className="flex items-center justify-center flex-col w-full h-dvh">
            <div className="flex gap-6">
                <VideoPlayer />
                <ChatPanel />
            </div>

        </main>
    )
}
