import React from "react";
import { BiInjection } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaMicroscope } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineMonitorHeart } from "react-icons/md";
import CountUpOnScroll from "../../components/Counter 1M/CountUpOnScroll"
import CountUp from "../../components/Counter 1M/CountUp"


export default function Pharmaceuticals() {
  const items = ["Diabetes Management", "Cardiovascular Health", "Respiratory Care", "Mental Health"];

  return (
    <div className="flex flex-col gap-24 justify-between items-center container mx-auto py-10 px-5 md:px-0">

      {/* tag */}
      <div className="pt-10 flex flex-col justify-center items-center w-full gap-10">
        <div className="bg-[#136bfb] rounded-3xl py-2 px-4">
          <p>Pharmaceutical Division</p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-center font-bold text-3xl lg:text-5xl">Revolutionizing Global Healthcare Access </h1>

          <p className="text-center text-sm md:text-base">
            RNA Supplies is expanding its mission to address critical medication shortages worldwide.
          </p>
        </div>
      </div>


      {/* background part */}

      <div
        className="relative bg-cover bg-center bg-no-repeat py-12 md:py-20 lg:py-36 px-4 rounded-3xl overflow-hidden w-full"
        style={{ backgroundImage: "url('/dental_image.jpeg')" }}
      >
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-blue-600/40"></div>

        {/* Content */}
        <div className="relative text-center flex flex-col gap-4 p-6 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-6xl font-bold text-white">Our Vision</h2>

          <p className="text-center leading-8 text-white">
            "To create a world where no life is lost due to medication unavailability.
            We believe in breaking down barriers to healthcare access and ensuring
            that life-saving medicines reach every corner of the globe."
          </p>
        </div>
      </div>


      {/* key focus area */}
      <div className="py-16">
        <div className="flex flex-col gap-12 ">
          <h3 className="text-center text-3xl font-semibold"> Key Focus Areas </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md: gap-6 w-full">
            {/* first caard */}

            <div className="border pl-4 pr-12 pt-4 pb-6 rounded-lg w-full">
              {/* Header */}
              <div className="flex gap-4 items-center mb-4">
                <FaRegHeart className="text-xl font-semibold" />
                <p className="text-xl font-semibold">Common Conditions</p>
              </div>

              {/* List Section */}
              <ul className="list-disc pl-6 space-y-2">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 rounded-lg text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* second caard */}

            <div className="border pl-4 pr-12 pt-4 pb-6 rounded-lg w-full">
              <div className="flex gap-4 items-center mb-4">
                <FaMicroscope className="text-xl font-semibold" />
                <p className="text-xl font-semibold">Rare Diseases</p>
              </div>

              {/* List Section */}
              <ul className="list-disc pl-6 space-y-2">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 rounded-lg text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* first caard */}

            <div className="border pl-4 pr-12 pt-4 pb-6 rounded-lg w-full">
              {/* Header */}
              <div className="flex gap-4 items-center mb-4">
                <FaEarthAmericas className="text-xl font-semibold" />
                <p className="text-xl font-semibold">Global Access</p>
              </div>

              {/* List Section */}
              <ul className="list-disc pl-6 space-y-2">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 rounded-lg text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>


      {/* Our Process */}
      <div className="border p-4 rounded-2xl py-16">
        <div className="flex flex-col gap-12 ">
          <h3 className="text-center text-3xl font-semibold"> Our Process</h3>

          <div className="flex flex-wrap md: gap-6 w-full">
            {/* first caard */}

            <div className="w-64">
              {/* Header */}
              <div className="flex flex-col gap-2 items-center mb-4">
                <FaRegHeart className="text-xl font-semibold" />
                <p className="text-xl font-semibold">Partnership</p>
                <p className="text-sm text-center">Collaborate with governments and healthcare providers</p>
              </div>

            </div>
            {/* first caard */}

            <div className="w-64">
              {/* Header */}
              <div className="flex flex-col gap-2 items-center mb-4">
                <MdOutlineMonitorHeart className="text-xl font-semibold" />
                <p className="text-xl font-semibold">Assessment</p>
                <p className="text-sm text-center">Analyze regional healthcare needs and gaps</p>
              </div>

            </div>
            {/* first caard */}

            <div className="w-64">
              {/* Header */}
              <div className="flex flex-col gap-2 items-center mb-4">
                <BiInjection className="text-xl font-semibold" />
                <p className="text-xl font-semibold">Distribution</p>
                <p className="text-sm text-center">Implement efficient supply chain solutions</p>
              </div>

            </div>
            {/* first caard */}

            <div className="w-64">
              {/* Header */}
              <div className="flex flex-col gap-2 items-center mb-4">
                <HiOutlineUsers className="text-xl font-semibold" />
                <p className="text-xl font-semibold">Impact</p>
                <p className="text-sm text-center">Monitor and measure healthcare outcomes</p>
              </div>

            </div>


          </div>
        </div>
      </div>

      {/* Join Our Mission */}
      <div className="py-16">
        <div className="flex flex-col gap-24 ">
          <div className="flex flex-col justify-center items-center gap-5 max-w-2xl mx-auto">
            <h3 className="text-center text-3xl font-semibold"> Join Our Mission </h3>
            <p className="text-center text-sm md:text-base">
              Together, we can make a significant impact on global healthcare accessibility. Partner with us to bring essential medicines to those who need them most.
            </p>

            <div className="bg-[#136bfb] rounded-3xl py-2 px-4">
              <p className="text-center">Contact Our Pharmaceutical Division</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md: gap-6 w-full">
            {/* first caard */}

            <div className="border rounded-lg w-full">
              {/* Header */}
              <div className="flex p-12 flex-col justify-center gap-2 items-center mb-4">

                 <CountUp  endValue={50} finalText="50+"/>
                <p>Countries Served</p>
              </div>


            </div>
            {/* Second caard */}

            <div className="border rounded-lg w-full">
              {/* Header */}
              <div className="flex p-12 flex-col justify-center gap-2 items-center mb-4">

                 <CountUp  endValue={1000000} finalText="1M+"/>
                <p>Lives Impacted</p>
              </div>


            </div>
            {/* Third caard */}

            <div className="border rounded-lg w-full">
              {/* Header */}
              <div className="flex p-12 flex-col justify-center gap-2 items-center mb-4">

                <CountUp  endValue={200} finalText="200+"/>
                <p>Medicine Types</p>
              </div>


            </div>


          </div>
        </div>
      </div>
    </div>
  );
}