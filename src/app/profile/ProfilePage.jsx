"use client";
import AddressSection from "@/components/profile/AddressSection";
import ProfileCard from "@/components/profile/ProfileCard";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { useFetchUserAddressesByIdQuery } from "@/redux/feature/address/addressApi";
import React from "react"; // Suspense remove koro
import { useSelector } from "react-redux";
import { useGetMyProfileQuery } from "@/redux/feature/users/usersApi";

// Direct export koro, alada component er dorkar nai
export default function ProfilePage() {
  const handleChangePassword = () => {
    console.log("Change password clicked");
  };
  const authUser = useSelector((state) => state?.auth?.user);
  const { data, isLoading, isFetching, error } = useGetMyProfileQuery();
  const profile = data?.data || data || {};

  if (isLoading || isFetching) {
    return (
      <div className="container mx-auto py-10">
        <BreadCrumb name="Home" title="Profile" />
        <div className="text-gray-300 mt-6">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <BreadCrumb name="Home" title="Profile" />
        <div className="text-red-400 mt-6">Failed to load profile</div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto flex justify-start items-center py-10">
        <BreadCrumb name="Home" title="Profile" />
      </div>
      <div className="min-h-screen p-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Section */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <ProfileCard
                  name={profile?.name || `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || authUser?.name || '—'}
                  email={profile?.email || authUser?.email || '—'}
                  phone={profile?.phone || profile?.mobile || '—'}
                  gdc={profile?.gdcNumber || profile?.gdc || '—'}
                  avatar={profile?.avatar || profile?.image || profile?.profileImage || "https://images.pexels.com/photos-2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"}
                  onChangePassword={handleChangePassword}
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-md">
                <AddressSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}