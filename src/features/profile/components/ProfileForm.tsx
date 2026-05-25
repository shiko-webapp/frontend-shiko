"use client";
import { useState } from "react";
import { IProfile } from "../models/IProfile";
import { updateProfile, IUpdateProfileRequest } from "../services/profileService";
import { addUserAchievement } from "../services/achievementsService";
import { IUserAchievement } from "../models/IUserAchievement";



interface IProfileFormProps {
  profile: IProfile;
  onSave: (updatedProfile: IProfile) => void;
  onAchievementAdded: (achievement: IUserAchievement) => void;
}

export const ProfileForm = ({ profile, onSave, onAchievementAdded }: IProfileFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber ?? "");
  const [description, setDescription] = useState(profile.description ?? "");

const handleSubmit = async () => {
  try {
    const request: IUpdateProfileRequest = {
      phoneNumber,
      description,
      profileImageUrl: profile.profileImageUrl,
    };
    const updatedProfile = await updateProfile(request);
    onSave(updatedProfile);

    // Achievement Profile Complete
    if (phoneNumber.trim() && description.trim()) {
      const achievement = await addUserAchievement("Profile Complete");
      onAchievementAdded(achievement);
    }

  } catch (error) {
    console.log(error);
  }
};

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-secondary-50 p-6">

      {/* First name - read only */}
      <div className="mb-4">
        <label className="block text-small font-semibold text-secondary-900 mb-1">First name</label>
        <input
          type="text"
          value={profile.firstName ?? ""}
          readOnly
          className="w-full border border-secondary-50 rounded-lg px-4 py-2 text-small bg-secondary-50 text-secondary-500 cursor-not-allowed"
        />
      </div>

      {/* Last name - read only */}
      <div className="mb-4">
        <label className="block text-small font-semibold text-secondary-900 mb-1">Last name</label>
        <input
          type="text"
          value={profile.lastName ?? ""}
          readOnly
          className="w-full border border-secondary-50 rounded-lg px-4 py-2 text-small bg-secondary-50 text-secondary-500 cursor-not-allowed"
        />
      </div>

      {/* Phone number */}
      <div className="mb-4">
        <label className="block text-small font-semibold text-secondary-900 mb-1">Phone number</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          className="w-full border border-secondary-50 rounded-lg px-4 py-2 text-small focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-small font-semibold text-secondary-900 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="w-full border border-secondary-50 rounded-lg px-4 py-2 text-small focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            setPhoneNumber(profile.phoneNumber ?? "");
            setDescription(profile.description ?? "");
          }}
          className="btn btn-md btn-secondary"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="btn btn-md btn-primary"
        >
          Save
        </button>
      </div>

    </section>
  );
};