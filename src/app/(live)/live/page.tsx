"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LiveClass, liveClassService } from "@/src/features/live/services/liveClassService";

export default function LivePage() {
    const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        liveClassService.getLiveClasses()
            .then(setLiveClasses)
            .catch((error) => console.error("Failed to load live classes:", error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="flex min-h-dvh w-full justify-center bg-gray-50 px-4 py-12">
            <div className="flex w-full max-w-5xl flex-col gap-6">
                <header className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-gray-900">Live Classes</h1>
                    <p className="text-sm text-gray-500">Select a class to join.</p>
                </header>

                {loading ? (
                    <p className="text-sm text-gray-500">Loading...</p>
                ) : liveClasses.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
                        <p className="text-sm text-gray-500">No live classes available.</p>
                    </div>
                ) : (
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {liveClasses.map((lc) => (
                            <li key={lc.id}>
                                <Link
                                    href={`/live/${lc.liveClassId}`}
                                    className="group flex h-full flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 font-semibold text-indigo-600">
                                            {lc.liveClassId}
                                        </span>
                                        <span className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-gray-500">
                                            →
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium text-gray-900">
                                            Live Class {lc.liveClassId}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(lc.createdAt).toLocaleDateString("sv-SE")}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}