"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { LuCamera, LuMail } from "react-icons/lu";
import { TbUserEdit } from "react-icons/tb";
import defaultProfile from "../../../public/placeholder.svg";

import { useGetMyProfileQuery } from "@/redux/feature/users/usersApi";

export default function ProfileCard({
  name,
  email,
  phone,
  gdc,
  avatar,
  onChangePassword,
}) {
  const navigate = useRouter();
  const { data, isLoading, isFetching, error } = useGetMyProfileQuery();
  const profile = data?.data || data || {};
  const imageUrl = profile?.imageUrl 
  console.log("profile gdc",gdc);
  

  return (
    <div className=" border border-[#e2e8f0] rounded-lg p-5">
      <div className="flex flex-col items-start my-10">
        <div className="relative mb-5">
          <Image
            src={ imageUrl||defaultProfile}          
            alt={name}
            width={100}
            height={100}
            className="w-32 h-32 rounded-full object-cover border-2"
          />
        
        </div>

        <div className="flex items-center gap-2 mb-4 text-center">
          <h2 className="text-2xl font-bold text-black">{name}</h2>

          <Link href="update_profile">
            <TbUserEdit className="w-5 h-5 text-black cursor-pointer" />
          </Link>
        </div>
      </div>

      <div className="space-y-5 mb-10">
        <div className="flex items-center gap-2 text-gray-300">
          <LuMail className="w-5 h-5 text-black" />
          <span className="text-black">{email}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <FaPhoneAlt className="w-5 h-5 text-black" />
          <span className="text-black">{phone}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <GrDocumentText className="w-5 h-5 text-black" />
          <span className="font-mono text-black">{gdc}</span>
        </div>
      </div>

      <Link
        href="/changes_pass"
        className="w-full border border-neutral-700  text-gray-500 py-3 px-4 rounded-lg flex items-center justify-between"
      >
        <span>Change Password</span>
        <img src="/arrow-right.png" alt="arrow-right" />
      </Link>
    </div>
  );
}
