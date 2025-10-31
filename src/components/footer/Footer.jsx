"use client";
import React from "react";
import { FaFacebook, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import Link from "next/link";
import { useGetContactInfoQuery } from "@/redux/feature/contact/contactInfoApi";

export default function Footer() {
  const { data, isFetching, error } = useGetContactInfoQuery();
  const emails = data?.emails || [];
  const phones = data?.phone || [];
  const facebook = data?.facebook;
  const instagram = data?.instagram;
  const twitter = data?.twitter;

  return (
    <footer className="bg-[#171716] text-white px-5 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5 md:gap-16 lg:gap-20">
        {/* First Column */}
        <section>
          <Link href="/" className=" leading-[55.46px] tracking-[-0.02em]">
            <img src="/logo.svg" alt="company logo" />
          </Link>
          <p className="mt-4 text-[15px] leading-[25.3px] max-w-[330px] text-[#9F9C96]">
            This platform is a digital home for preserving family legacy,
            celebrating Black history, and strengthening connections across
            generations. It offers a secure space for family members to explore
            historical timelines, share personal stories, access family trees,
            and pass down traditions
          </p>
        </section>

        {/* Second Column */}
        <section>
          <h3 className="text-lg font-semibold mb-5">Information</h3>
          <ul className="space-y-4 flex flex-col">
            <Link href="/about_us">
              <span className="text-lg rounded-full py-2 hover:text-primary text-[#9F9C96]">
                About Us
              </span>
            </Link>
            <Link href="/contact_us">
              <span className="text-lg rounded-full py-2 hover:text-primary text-[#9F9C96]">
                Contact Us
              </span>
            </Link>
            <Link href="/terms_conditions">
              <span className="text-lg rounded-full py-2 hover:text-primary text-[#9F9C96]">
                Terms and Conditions
              </span>
            </Link>
            <Link href="/privacy_policy">
              <span className="text-lg rounded-full py-2 hover:text-primary text-[#9F9C96]">
                Privacy Policy
              </span>
            </Link>
          </ul>
        </section>

        {/* Third Column */}
        <section>
          <h3 className="text-lg font-semibold mb-6">Contact</h3>
          <ul className="space-y-4">
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 text-[#9F9C96] text-[18px] hover:text-primary transition duration-300"
              >
                <IoMailOutline />
                {isFetching && <span>Loading...</span>}
                {error && <span>Failed to load</span>}
                {!isFetching && !error && (
                  <span>Email: {emails[0] || "N/A"}</span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 text-[#9F9C96] text-[18px] hover:text-primary transition duration-300"
              >
                <FaPhoneAlt />
                {isFetching && <span>Loading...</span>}
                {error && <span>Failed to load</span>}
                {!isFetching && !error && (
                  <span>Phone: {phones[0] || "N/A"}</span>
                )}
              </Link>
            </li>
          </ul>
        </section>

        {/* Fourth Column */}
        <section>
          <h3 className="text-lg font-semibold mb-5">Social media</h3>
          <div className="flex flex-col gap-2 mt-5">
            {facebook && (
              <a href={facebook} target="_blank" rel="noreferrer" className="flex items-center justify-start gap-2 text-[#9F9C96] hover:text-white">
                <FaFacebook />
                Facebook
              </a>
            )}
            {instagram && (
              <a href={instagram} target="_blank" rel="noreferrer" className="flex items-center justify-start gap-2 text-[#9F9C96] hover:text-white">
                <FaInstagram />
                Instagram
              </a>
            )}
            {twitter && (
              <a href={twitter} target="_blank" rel="noreferrer" className="flex items-center justify-start gap-2 text-[#9F9C96] hover:text-white">
                <FaXTwitter />
                Twitter
              </a>
            )}
          </div>
        </section>
      </div>
    </footer>
  );
}
