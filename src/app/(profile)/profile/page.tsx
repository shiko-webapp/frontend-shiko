"use client";
import { useEffect, useState } from "react";
import { IProfile } from "@/src/features/profile/models/IProfile";
import { IUserSkill } from "@/src/features/profile/models/IUserSkill";
import { IUserAchievement } from "@/src/features/profile/models/IUserAchievement";
import { getProfile } from "@/src/features/profile/services/profileService";

export default function ProfilePage() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [skills, setSkills] = useState<IUserSkill[]>([]);
  const [achievements, setAchievements] = useState<IUserAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const profileData = await getProfile();
        setProfile(profileData);
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
      <h1>Profile</h1>
      <p>{profile?.firstName} {profile?.lastName}</p>
    </main>
  );
}