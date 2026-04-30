import { Link, Send } from "lucide-react";

export default function ChatPanel() {
    return (
        <div className="flex flex-col w-sm bg-gray-100 rounded-3xl h-screen">
            <div className="mt-4 p-4">
                <h5>Live Chat</h5>
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col items-start p-4">
                    <p>Mosharrof</p>
                    <div className="bg-gray-200 p-3 rounded-lg">
                        <p className="text-sm">Hey! I'm waiting</p>
                    </div>
                    <p className="text-xs text-gray-400">07:32 pm</p>
                </div>
                <div className="flex flex-col items-end p-4">
                    <p>You</p>
                    <div className="bg-red-100 p-3 rounded-lg">
                        <p className="text-sm">Hello All! How are U?</p>
                    </div>
                    <p className="text-xs text-gray-400">07:33 pm</p>
                </div>
                <div className="flex flex-col items-start p-4">
                    <p>Mosharrof</p>
                    <div className="bg-gray-200 p-3 rounded-lg">
                        <p className="text-sm">Are we waiting for absent team-class</p>
                    </div>
                    <p className="text-xs text-gray-400">07:38 pm</p>
                </div>
                <div>
                </div>
            </div>
            <div className="flex flex-col item-end p-4 gap-2">
                <div className="flex flex-col items-end">
                    <p className="text-sm">Hassan is Typing...</p>
                </div>
                <div className="relative w-full">
                    <input type="text" placeholder="Type message..." className="bg-gray-200 p-3 rounded-lg focus:outline-none w-full" />
                    <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
                        <button className="rounded-md bg-gray-300 p-2">
                            <Link className="h-4 w-4 text-gray-500" />
                        </button>
                        <button className="rounded-md bg-red-500 p-2">
                            <Send className="h-4 w-4 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}