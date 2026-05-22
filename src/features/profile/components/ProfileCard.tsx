"use client";
import { IProfile } from "../models/IProfile";
import { IUserSkill } from "../models/IUserSkill";
import { IUserAchievement } from "../models/IUserAchievement";

interface IProfileCardProps {
  profile: IProfile;
  skills: IUserSkill[];
  achievements: IUserAchievement[];
  role: string;
}

export const ProfileCard = ({ profile, skills, achievements, role }: IProfileCardProps) => {
  return (
    <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-secondary-50 flex flex-col">
      
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-purple-900 to-pink-600" />

      <div className="px-6 pb-6">
      {/* Profile image */}
      <div className="flex flex-col items-center mt-4 mb-4">
        <div className="w-20 h-20 rounded-full border-4 border-white bg-secondary-50 overflow-hidden -mt-14">
          {profile.profileImageUrl ? (
            <img src={profile.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-secondary-50" />
          )}
        </div>

        {/* Name */}
        <h5 className="text-secondary-900 mt-2">{profile.firstName} {profile.lastName}</h5>

        {/* Role badge */}
        <span className="text-small bg-primary-50 text-primary-500 rounded-full px-3 py-1 mt-1">
          {role}
        </span>
      </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-4">
            <p className="font-bold text-secondary-900 mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-small border border-secondary-50 rounded-full px-3 py-1 text-secondary-500 bg-secondary-50"
                >
                  {skill.skillName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mt-4">
            <p className="font-bold text-secondary-900 mb-2">Achievements</p>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement) => (
                <span
                  key={achievement.id}
                  className="text-small bg-tertiary-50 text-tertiary-500 rounded-full px-3 py-1"
                >
                  {achievement.achievementName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bio */}
        {profile.description && (
          <div className="mt-4">
            <p className="font-bold text-secondary-900 mb-2">Bio</p>
            <div className="bg-secondary-50 rounded-xl p-3">
              <p className="text-small text-secondary-500">{profile.description}</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};