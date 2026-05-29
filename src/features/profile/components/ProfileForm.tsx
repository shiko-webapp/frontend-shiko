"use client";
import { useState } from "react";
import { IProfile } from "../models/IProfile";
import { updateProfile, IUpdateProfileRequest } from "../services/profileService";
import { addUserAchievement } from "../services/achievementsService";
import { IUserAchievement } from "../models/IUserAchievement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface IProfileFormProps {
  profile: IProfile;
  onSave: (updatedProfile: IProfile) => void;
  onAchievementAdded: (achievement: IUserAchievement) => void;
}

export const ProfileForm = ({ profile, onSave, onAchievementAdded }: IProfileFormProps) => {
  const [firstName, setFirstName] = useState(profile.firstName ?? "");
  const [lastName, setLastName] = useState(profile.lastName ?? "");
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber ?? "");
  const [description, setDescription] = useState(profile.description ?? "");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }
    setError("");
    try {
      const request: IUpdateProfileRequest = {
        firstName,
        lastName,
        phoneNumber,
        description,
        profileImageUrl: profile.profileImageUrl,
      };
      const updatedProfile = await updateProfile(request);
      onSave(updatedProfile);

      // Achievement Profile Complete
      if (phoneNumber.trim() && description.trim()) {
        const achievement = await addUserAchievement("Profile Complete");
        if (achievement) onAchievementAdded(achievement);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-secondary-50 p-6">

      {/* Profile photo placeholder */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-secondary-50 flex items-center justify-center">
          <FontAwesomeIcon icon={faUser} className="text-secondary-500 text-xl" />
        </div>
      </div>

      {/* First name */}
      <div className="mb-4">
        <label className="block text-small font-semibold text-secondary-900 mb-1">First name *</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border border-secondary-50 rounded-lg px-4 py-2 text-small focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Last name */}
      <div className="mb-4">
        <label className="block text-small font-semibold text-secondary-900 mb-1">Last name *</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border border-secondary-50 rounded-lg px-4 py-2 text-small focus:outline-none focus:ring-2 focus:ring-primary-500"
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

      {error && (
        <p className="text-primary-500 text-small mb-3">{error}</p>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            setFirstName(profile.firstName ?? "");
            setLastName(profile.lastName ?? "");
            setPhoneNumber(profile.phoneNumber ?? "");
            setDescription(profile.description ?? "");
            setError("");
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