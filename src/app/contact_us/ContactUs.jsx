"use client";
import MapComponent from "@/components/mapCompo/MapComponent";
import BreadCrumb from "@/components/shared/BreadCrumb";
import {
  useGetContactInfoQuery,
  useSendContactMessageMutation,
} from "@/redux/feature/contact/contactInfoApi";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react"; // Suspense remove koro
import { BiMapPin } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { MdMail, MdPhone } from "react-icons/md";
import Swal from "sweetalert2";
import logo from "../../../public/logo.png";

export default function ContactUs() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { data, isFetching, error } = useGetContactInfoQuery();
  const [sendContactMessage, { isLoading: sending }] =
    useSendContactMessageMutation();
  const emails = data?.emails || [];
  const phones = data?.phone || [];
  const socials = {
    facebook: data?.facebook,
    instagram: data?.instagram,
    twitter: data?.twitter,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { subject, content: message };
      const res = await sendContactMessage(payload).unwrap();
      Swal.fire(
        "Sent",
        res?.message || "Your message has been sent.",
        "success"
      );
      setSubject("");
      setMessage("");
    } catch (err) {
      Swal.fire(
        "Error",
        err?.data?.message || "Failed to send message.",
        "error"
      );
    }
  };
  console.log(emails);
  return (
    <div className="min-h-screen py-5">
      <div className="container mx-auto flex justify-start items-center">
        <BreadCrumb name="Home" title="Contact Us" />
      </div>
      <div className="container mx-auto py-5 rounded-lg">
        <div className="max-w-5xl mx-auto p-5">
          <div className="flex flex-col md:flex-col lg:flex-row gap-10">
            {/* information */}
            <div className="flex flex-col w-full shadow-2xl p-8 rounded-2xl">
              <div>
                <p className="text-[#4a90e2] text-xl font-semibold">
                  Contact Information
                </p>
              </div>

              {/* emails */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-gray-300 mt-12">
                  <MdMail className="text-xl text-black" />

                  <div>
                    {isFetching && <div className="text-white">Loading...</div>}
                    {error && (
                      <div className="text-red-400">Failed to load</div>
                    )}
                    {!isFetching && !error && (
                      <div className="flex flex-col">
                        {emails.map((em) => (
                          <span key={em} className="text-xl text-black">
                            {em}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* phone */}

                <div className="flex items-center gap-3 text-gray-300">
                  <MdPhone className="text-xl text-black" />

                  <div>
                    {isFetching && <div className="text-white">Loading...</div>}
                    {error && (
                      <div className="text-red-400">Failed to load</div>
                    )}
                    {!isFetching && !error && (
                      <div className="flex flex-col">
                        {phones.map((ph) => (
                          <span key={ph} className="text-black text-xl">
                            {ph}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* map pin */}
                <div className="flex items-center gap-3">
                  <BiMapPin className="text-black text-xl " />
                  <p className="text-black text-xl">London, United Kingdom</p>
                </div>
                <Link
                  href="https://www.instagram.com/rnasupplies/#"
                  isExternal
                  className="flex items-center gap-3"
                >
                  <FaInstagram className="text-black text-xl " />
                  <p className="text-black text-xl">@rnasupplies</p>
                </Link>
              </div>
            </div>
            {/* map */}
            <div className=" p-2 w-full shadow-2xl rounded-2xl">
              <MapComponent />
            </div>
          </div>

          {/* RNA Supplies */}

          <div className="flex flex-col w-full shadow-2xl p-8 rounded-2xl max-w-xl mt-12">
            <div>
              <Image
                src={logo}
                width={400}
                className="rounded-2xl overflow-hidden"
              />
            </div>
            <p className="text-[#606162]">
              Visit our modern facility equipped with state-of-the-art dental
              supplies and equipment. We're committed to providing the highest
              quality products and exceptional customer service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
