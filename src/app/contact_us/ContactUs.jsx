"use client"
import BreadCrumb from "@/components/shared/BreadCrumb";
import { useGetContactInfoQuery, useSendContactMessageMutation } from "@/redux/feature/contact/contactInfoApi";
import React, { useState } from "react"; // Suspense remove koro
import { MdMail, MdPhone } from "react-icons/md";
import Swal from "sweetalert2";

export default function ContactUs() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { data, isFetching, error } = useGetContactInfoQuery();
  const [sendContactMessage, { isLoading: sending }] = useSendContactMessageMutation();
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
      Swal.fire("Sent", res?.message || "Your message has been sent.", "success");
      setSubject("");
      setMessage("");
    } catch (err) {
      Swal.fire("Error", err?.data?.message || "Failed to send message.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white py-5">
      <div className="container mx-auto flex justify-start items-center">
        <BreadCrumb name="Home" title="Contact Us" />
      </div>
      <div className="container mx-auto py-5 shadow-lg rounded-lg bg-[#1c1c1c]">
        <div className="p-5 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-10 pt-5">
            <div className="flex items-center gap-3 text-gray-300">
              <MdMail className="w-6 h-6 text-blue-500" />
              <span className="text-[#136BFB] font-medium text-[25px]">
                Email :
              </span>
              <div>
                {isFetching && <div className="text-white">Loading...</div>}
                {error && <div className="text-red-400">Failed to load</div>}
                {!isFetching && !error && (
                  <div className="flex flex-col">
                    {emails.map((em) => (
                      <span key={em} className="text-white text-[18px]">{em}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <MdPhone className="w-6 h-6 text-blue-500" />
              <span className="text-[#136BFB] font-medium text-[25px]">
                Phone :
              </span>
              <div>
                {isFetching && <div className="text-white">Loading...</div>}
                {error && <div className="text-red-400">Failed to load</div>}
                {!isFetching && !error && (
                  <div className="flex flex-col">
                    {phones.map((ph) => (
                      <span key={ph} className="text-white text-[18px]">{ph}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-[#9F9C96] text-lg">Contact with us</p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="subject"
                className="block text-[#9F9C96] mb-3 text-left"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Type here.."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#1c1c1c] border border-[#9F9C96] text-white placeholder-[#9F9C96] rounded-lg h-12 px-4 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-[#9F9C96] mb-3 text-left"
              >
                Opinions
              </label>
              <textarea
                id="message"
                placeholder="What can we help with?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#1c1c1c] border border-[#9F9C96] text-white placeholder-[#9F9C96] rounded-lg min-h-[150px] p-4 resize-none focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200"
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}