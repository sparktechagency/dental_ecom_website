import React, { Suspense } from 'react'
import SectionHeading from '../shared/SectionHeading'

export default function AboutUs() {
  return (
   <Suspense fallback={<div>Loading...</div>}>
     <div className="relative bg-[#171716]">
      {/* Blue shadow/glow effect at top-left corner */}
      <div className="absolute top-0 left-0">
        <div className="w-[500px] h-[500px] bg-[#136BFB] opacity-20 blur-3xl rounded-full"></div>
      </div>

      <div className="relative z-10">
        <SectionHeading showButton={false} title='About US'></SectionHeading>

        {/* Main Content */}
        <div className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-12 gap-28 ">

              {/* Left Side - Images */}
              <div className="relative">
                {/* Background Image - Dentist with patient */}
                <div className="relative">
                  <img
                    src="https://i.ibb.co/S41xMSpc/doc2.jpg"
                    alt="Dentist with patient"
                    className="w-96 h-80 object-cover rounded-2xl shadow-2xl"
                  />

                  {/* Overlapping Image - Dental professional */}
                  <div className="absolute -bottom-20 md:-right-8 -right-2 lg:right-40">
                    <img
                      src="https://i.ibb.co/FvKkfqt/doc1.jpg"
                      alt="Dental professional"
                      className="w-64 h-64 object-cover rounded-2xl shadow-2xl border-12 border-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-8 lg:pl-8">

                {/* First Mission Block */}
                <div>
                  <h3 className="text-white text-2xl font-bold mb-4">
                    Our Business Mission
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    RNA Supplies is committed to revolutionizing how dental practices manage their supply costs. Our
                    mission is to help your practice achieve significant cost savings while maintaining the highest quality
                    standards RNA Supplies is committed to revolutionizing how dental practices manage their supply
                    costs. Our mission is to help your practice achieve significant cost savings while maintaining the
                    highest quality standards.
                  </p>
                </div>

                {/* Second Mission Block */}
                <div>
                  <h3 className="text-white text-2xl font-bold mb-4">
                    Our Business Mission
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    RNA Supplies is committed to revolutionizing how dental practices manage their supply costs. Our
                    mission is to help your practice achieve significant cost savings while maintaining the highest quality
                    standards RNA Supplies is committed to revolutionizing how dental practices manage their supply
                    costs. Our mission is to help your practice achieve significant cost savings while maintaining the
                    highest quality standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </Suspense>
  )
}