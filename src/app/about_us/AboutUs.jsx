"use client";
import BreadCrumb from "@/components/shared/BreadCrumb";
import React, { useEffect } from "react";
import { useGetPageByKeyQuery } from "@/redux/feature/pages/pagesApi";
import Subscribe from "@/components/home/Subscribe";
import "aos/dist/aos.css";
import AOS from 'aos';

export default function AboutUs() {


  
  useEffect(() => {
    AOS.init();
  }, []);


  const { data, isFetching, error } = useGetPageByKeyQuery("about");

  const title = data?.data?.title || data?.title || "About Us";
  const content = data?.data?.content || data?.content || data?.data || "";

  if (isFetching) {
    return (
      <div className="min-h-screen bg-[#171717] text-white py-5">
        <div className="container mx-auto flex justify-start items-center">
          <BreadCrumb name="Home" title="About Us" />
        </div>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {" "}
      <div className="min-h-screen  text-black py-5">
        <div className="container mx-auto flex justify-start items-center">
          <BreadCrumb name="Home" title="About Us" />
        </div>
        <div
               data-aos="fade-up"
               data-aos-duration="800"
        className="container mx-auto p-5 rounded-lg ">
          <section className="px-6 py-12 text-slate-700 leading-relaxed">
            <h1 className="text-2xl font-bold mb-5 text-black">{title}</h1>
            {error && <p className="text-red-400">Failed to load content.</p>}
            {!error &&
              (typeof content === "string" ? (
                <div
                  className="prose prose-invert max-w-none text-black"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <pre className="text-white whitespace-pre-wrap">
                  {JSON.stringify(content, null, 2)}
                </pre>
              ))}
          </section>
        </div>
      </div>

      <div> <Subscribe/> </div>
    </div>
  );
}
