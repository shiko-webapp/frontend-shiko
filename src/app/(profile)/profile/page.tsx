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

export default function ProfilePage() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [skills, setSkills] = useState<IUserSkill[]>([]);
  const [achievements, setAchievements] = useState<IUserAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [profileResult, skillsResult, achievementsResult] = await Promise.allSettled([
          getProfile(),
          getUserSkills(),
          getUserAchievements(),
        ]);

        if (profileResult.status === "fulfilled") setProfile(profileResult.value);
        if (skillsResult.status === "fulfilled") setSkills(skillsResult.value);
        if (achievementsResult.status === "fulfilled") setAchievements(achievementsResult.value);
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
  <main className="p-8">
    <h4 className="text-2xl font-bold mb-6">Profile</h4>
    {profile && (
      <div className="flex gap-6">
        {/* Profile Card */}
        <div className="w-80 shrink-0">
          <ProfileCard
            profile={profile}
            skills={skills}
            achievements={achievements}
          />
        </div>
        {/* Profile Form */}
        <div className="flex-1">
          <ProfileForm
            profile={profile}
            onSave={(updatedProfile) => setProfile(updatedProfile)}
          />
        </div>
      </div>
    )}
  </main>
);
}