"use client";
import { useEffect, useState } from "react";
import { IProfile } from "@/src/features/profile/models/IProfile";
import { IUserSkill } from "@/src/features/profile/models/IUserSkill";
import { IUserAchievement } from "@/src/features/profile/models/IUserAchievement";
import { getProfile } from "@/src/features/profile/services/profileService";
import { getUserSkills } from "@/src/features/profile/services/skillsService";
import { getUserAchievements } from "@/src/features/profile/services/achievementsService";
import { ProfileCard } from "@/src/features/profile/components/ProfileCard";
import { ProfileForm } from "@/src/features/profile/components/ProfileForm";
import { ICurrentUser } from "@/src/features/profile/models/ICurrentUser";

export default function ProfilePage() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [skills, setSkills] = useState<IUserSkill[]>([]);
  const [achievements, setAchievements] = useState<IUserAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [profileResult, skillsResult, achievementsResult, userResult] = await Promise.allSettled([
          getProfile(),
          getUserSkills(),
          getUserAchievements(),
          fetch("/api/auth/me").then(res => res.json()),
        ]);

        if (profileResult.status === "fulfilled") setProfile(profileResult.value);
        if (skillsResult.status === "fulfilled") setSkills(skillsResult.value);
        if (achievementsResult.status === "fulfilled") setAchievements(achievementsResult.value);
        if (userResult.status === "fulfilled") setCurrentUser(userResult.value);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;

return (
  <main className="min-h-screen p-8">
    <h4 className="mb-6">Profile</h4>
    <div className="flex gap-6 items-start">
      {/* Profile Card */}
      {profile && (
        <div className="w-96 shrink-0">
        <ProfileCard
          profile={profile}
          skills={skills}
          achievements={achievements}
          role={currentUser?.role ?? "Student"}
        />
        </div>
      )}
      {/* Profile Form */}
      <div className="flex-1">
        <ProfileForm
          profile={profile ?? { id: 0, userId: "", firstName: "", lastName: "", phoneNumber: "", description: "", profileImageUrl: "" }}
          onSave={(updatedProfile) => setProfile(updatedProfile)}
        />
      </div>
    </div>
  </main>
);
}