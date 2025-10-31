"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { LuCamera, LuMail } from "react-icons/lu";
import { TbUserEdit } from "react-icons/tb";

export default function ProfileCard({
  name,
  email,
  phone,
  gdc,
  avatar,
  onChangePassword,
}) {
  const navigate = useRouter();
  return (
    <div className="bg-[#202020] rounded-lg p-5">
      <div className="flex flex-col items-start my-10">
        <div className="relative mb-5">
          <img
            src={avatar}
            alt={name}
            className="w-32 h-32 rounded-full object-cover border-4 border-[#136BFB]"
          />
          <button className="absolute bottom-2 right-2 bg-[#136BFB] hover:bg-blue-600 rounded-full p-2 transition-colors">
            <LuCamera className="w-4 h-4 text-white " />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4 text-center">
          <h2 className="text-2xl font-bold text-white">{name}</h2>

          <Link href="update_profile">
            <TbUserEdit className="w-5 h-5 text-[#136BFB] cursor-pointer" />
          </Link>
        </div>
      </div>

      <div className="space-y-5 mb-10">
        <div className="flex items-center gap-2 text-gray-300">
          <LuMail className="w-5 h-5 text-[#9F9C96]" />
          <span className="text-[#9F9C96]">{email}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <FaPhoneAlt className="w-5 h-5 text-[#9F9C96]" />
          <span className="text-[#9F9C96]">{phone}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <GrDocumentText className="w-5 h-5 text-[#9F9C96]" />
          <span className="font-mono text-[#9F9C96]">{gdc}</span>
        </div>
      </div>

      <Link
        href="/changes_pass"
        className="w-full bg-neutral-700 text-gray-500 py-3 px-4 rounded-lg flex items-center justify-between"
      >
        <span>Change Password</span>
        <img src="/arrow-right.png" alt="arrow-right" />
      </Link>
    </div>
  );
}
