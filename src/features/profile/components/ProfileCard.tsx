"use client";
import { useRef } from "react";
import { IProfile } from "../models/IProfile";
import { IUserSkill } from "../models/IUserSkill";
import { IUserAchievement } from "../models/IUserAchievement";
import { uploadFile } from "../services/fileHandlerService";
import { updateProfile } from "../services/profileService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faX, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ISkill } from "../models/ISkill";
import { addUserSkill, removeUserSkill } from "../services/userSkillsService";
import { getSkills } from "../services/skillsService";
import { createSkill, deleteSkill } from "../services/adminSkillsService";

interface IProfileCardProps {
  profile: IProfile;
  skills: IUserSkill[];
  achievements: IUserAchievement[];
  role: string;
  onProfileUpdate: (updatedProfile: IProfile) => void;
  onSkillsUpdate: (skills: IUserSkill[]) => void;
}

export const ProfileCard = ({ profile, skills, achievements, role, onProfileUpdate, onSkillsUpdate }: IProfileCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;

    try {
      const uploaded = await uploadFile(file); 
      const updatedProfile = await updateProfile({
        phoneNumber: profile.phoneNumber,
        description: profile.description,
        profileImageUrl: uploaded.fileUrl,
      });
      onProfileUpdate(updatedProfile);
    } catch (error) {
      console.log(error);
    }
  }
  const [showSkillPicker, setShowSkillPicker] = useState(false);
  const [allSkills, setAllSkills] = useState<ISkill[]>([]);
  const [activeTab, setActiveTab] = useState<"profile" | "manage">("profile");
  const [newSkillName, setNewSkillName] = useState("");
  const [allSkillsList, setAllSkillsList] = useState<ISkill[]>([]);

  const handleCreateSkill = async () => {
    if (!newSkillName.trim()) return;
    const created = await createSkill(newSkillName);
    setAllSkillsList([...allSkillsList, created]);
    setNewSkillName("");
  };

  const handleDeleteSkill = async (id: number) => {
    await deleteSkill(id);
    setAllSkillsList(allSkillsList.filter(s => s.id !== id));
  };

const handleOpenManageTab = async () => {
  const fetched = await getSkills();
  setAllSkillsList(fetched);
  setActiveTab("manage");
};

  const handleOpenSkillPicker = async () => {
    if (!showSkillPicker) {
      const fetched = await getSkills();
      // Filtrera bort skills användaren redan har
      const available = fetched.filter(
        s => !skills.some(us => us.skillId === s.id)
      );
      setAllSkills(available);
    }
    setShowSkillPicker(!showSkillPicker);
  };

  const handleAddSkill = async (skill: ISkill) => {
    const added = await addUserSkill(skill.id);
    onSkillsUpdate([...skills, added]);
    setAllSkills(allSkills.filter(s => s.id !== skill.id));
  };

  const handleRemoveSkill = async (userSkill: IUserSkill) => {
    await removeUserSkill(userSkill.id);
    onSkillsUpdate(skills.filter(s => s.id !== userSkill.id));
  };

  return (
    <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-secondary-50 flex flex-col">
      
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-purple-900 to-pink-600" />

      <div className="px-6 pb-6">
        {/* Profile image */}
        <div className="flex flex-col items-center mt-4 mb-4">
          <div className="relative w-20 h-20 -mt-14 cursor-pointer" onClick={handleImageClick}>
            <div className="w-20 h-20 rounded-full border-4 border-white bg-secondary-50 overflow-hidden hover:scale-105 transition-transform">
              {profile.profileImageUrl ? (
                <img src={profile.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-secondary-50" />
              )}
            </div>
            {/* Edit icon */}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center border-2 border-white hover:scale-105 transition-transform">
              <FontAwesomeIcon icon={faPen} className="text-white text-[8px]" />
            </div>
          </div>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Tabs - Admin only */}
          {role === "Admin" && (
            <div className="flex gap-2 mt-3 mb-2 border-b border-secondary-50 justify-center">
              <button
                onClick={() => setActiveTab("profile")}
                className={`text-small font-bold pb-2 px-1 border-b-2 transition-colors cursor-pointer ${
                  activeTab === "profile"
                    ? "border-primary-500 text-primary-500"
                    : "border-transparent text-secondary-500 hover:text-secondary-900"
                }`}
              >
                Profile
              </button>
              <button
                onClick={handleOpenManageTab}
                className={`text-small font-bold pb-2 px-1 border-b-2 transition-colors cursor-pointer ${
                  activeTab === "manage"
                    ? "border-primary-500 text-primary-500"
                    : "border-transparent text-secondary-500 hover:text-secondary-900"
                }`}
              >
                Manage Skills
              </button>
            </div>
          )}

          {/* Name */}
          <h5 className="text-secondary-900 mt-2">{profile.firstName} {profile.lastName}</h5>

          {/* Role badge */}
          <span className="text-small bg-primary-50 text-primary-500 rounded-full px-3 py-1 mt-1">
            {role}
          </span>
        </div>

        {/* Manage Skills tab */}
        {activeTab === "manage" && role === "Admin" && (
          <div>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="New skill name"
                className="flex-1 border border-secondary-50 rounded-lg px-3 py-2 text-small focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button onClick={handleCreateSkill} className="btn btn-md btn-primary">
                Add
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {allSkillsList.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between bg-secondary-50 rounded-lg px-3 py-2">
                  <span className="text-small text-secondary-900">{skill.skillName}</span>
                  <button onClick={() => handleDeleteSkill(skill.id)} className="text-primary-500 hover:text-primary-700 cursor-pointer">
                    <FontAwesomeIcon icon={faTimes} className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile tab content */}
        {activeTab === "profile" && (
          <>
            {/* Skills */}
            <div className="mt-4">
              <div className="flex items-center mb-2 gap-1">
                <p className="font-bold text-secondary-900">Skills</p>
                <button onClick={handleOpenSkillPicker} className="text-secondary-900 hover:text-primary-500 transition-colors cursor-pointer">
                  <FontAwesomeIcon icon={faPlus} className="text-sm" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="group text-small border border-secondary-50 rounded-full px-3 py-1 text-secondary-500 bg-secondary-50 flex items-center gap-1">
                    {skill.skillName}
                    <button onClick={() => handleRemoveSkill(skill)} className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <FontAwesomeIcon icon={faX} className="text-[10px] text-secondary-500 hover:text-primary-500" />
                    </button>
                  </span>
                ))}
              </div>
              {showSkillPicker && (
                <div className="mt-3 p-3 bg-secondary-50 rounded-xl">
                  <p className="text-small font-bold text-secondary-900 mb-2">Add skill</p>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map((skill) => (
                      <button
                        key={skill.id}
                        onClick={() => handleAddSkill(skill)}
                        className="text-small border border-secondary-50 rounded-full px-3 py-1 text-secondary-500 bg-white hover:bg-primary-50 hover:text-primary-500 transition-colors"
                      >
                        {skill.skillName}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Achievements */}
            {achievements.length > 0 && (
              <div className="mt-4">
                <p className="font-bold text-secondary-900 mb-2">Achievements</p>
                <div className="flex flex-wrap gap-2">
                  {achievements.map((achievement) => (
                    <span key={achievement.id} className="text-small bg-tertiary-50 text-tertiary-500 rounded-full px-3 py-1">
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
          </>
        )}

      </div>
    </section>
  );
};