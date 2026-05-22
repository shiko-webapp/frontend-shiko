import { UserCircle } from "lucide-react";
import { OnlineUser } from "../services/liveClassService"

interface VideoPlayerProps {
    onlineUsers: OnlineUser[];
}

export default function VideoPlayer({ onlineUsers }: VideoPlayerProps) {
    const MAX_AVATARS = 5;
    const visibleUsers = onlineUsers.slice(0, MAX_AVATARS);
    const extraCount = onlineUsers.length - MAX_AVATARS;

    return (
        <div className="w-3xl bg-gray-100 rounded-3xl">
            <div className="flex flex-col p-4 space-y-4">
                <img src="/live-class.png" alt="live class" className="w-full" />
                <h3>Foundations of Digital Marketing</h3>
                <div className="flex gap-10">
                    <span>Jack Sally</span>
                    <span>{onlineUsers.length} Students</span>
                </div>

                <h5>Student</h5>
                <div className="flex -space-x-2">
                    {visibleUsers.map((user) => (
                        <div key={user.connectionId} title={user.userName}>
                            {user.userImageUrl ? (
                                <img
                                    src={user.userImageUrl}
                                    alt={user.userName}
                                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                                />
                            ) : (
                                <UserCircle className="h-10 w-10 text-gray-400 bg-white rounded-full" />
                            )}
                        </div>
                    ))}
                    {extraCount > 0 && (
                        <div className="h-10 w-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-medium border-2 border-white">
                            {extraCount}+
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}