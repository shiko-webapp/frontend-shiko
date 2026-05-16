"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const router = useRouter();
    
  return (
    <div className="flex h-screen w-screen bg-[#f5f5f7] p-4 gap-4">
      {/* Left Panel */}
      <div className="relative w-[46%] rounded-2xl overflow-hidden flex-shrink-0">
        <Image
          src="/auth-background.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/10 to-black/50 rounded-2xl" />
        <div
          className="absolute top-7 left-7 z-10 flex items-center gap-2.5 text-white"
          onClick={() => router.push("/")}
        >
          <div className="w-8 h-8 rounded-md bg-white/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 6h8L9 11h6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="15" cy="15" r="2.5" fill="#E8472A" />
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-tight">Shiko</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-white rounded-2xl overflow-y-auto">
        <div className="w-full max-w-[420px] px-10 py-10">{children}</div>
      </div>
    </div>
  );
}
