"use client";
import { ICurrentUser } from "@/src/features/profile/models/ICurrentUser";
import { IProfile } from "@/src/features/profile/models/IProfile";
import Image from "next/image";

interface IHeaderProps {
  profile: IProfile | null;
  currentUser: ICurrentUser | null;
}

export const Header = ({ profile, currentUser }: IHeaderProps) => {
  return (
    <header className="bg-white rounded-2xl shadow-sm border border-secondary-50 px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <Image src="/shiko-logo.svg" alt="Shiko" width={120} height={40} />

      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-small font-bold text-secondary-900">
            {profile?.firstName} {profile?.lastName}
          </p>
          <p className="text-small text-secondary-500">{currentUser?.email}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-secondary-50 overflow-hidden">
          {profile?.profileImageUrl ? (
            <img src={profile.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-secondary-50 flex items-center justify-center">
              <span className="text-secondary-500 font-bold">
                {profile?.firstName?.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};