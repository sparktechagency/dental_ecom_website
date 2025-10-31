import React, { Suspense } from 'react';
import SaveOverTime from './SaveOverTime';

export default function MagicMoney() {
  return (
   <Suspense fallback={<div>Loading...</div>}>
     <div className="w-full bg-[#171716] min-h-screen relative">
      {/* Blue shadow/glow effect at center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[800px] bg-[#136BFB] opacity-20 blur-3xl rounded-full"></div>
      </div>
      <div className="container mx-auto text-white p-8 min-h-screen relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Star decorations */}
          <div className="relative mb-6">
            <div className="absolute md:-top-4 -top-8 md:left-60 -left-6">
              <img src="https://i.ibb.co/Q3kZpXGG/greenstar.png" alt="Green star" className="size-12" />
            </div>
            <div className="absolute md:-top-2 -top-5 md:right-60 -right-7">
              <img src="https://i.ibb.co/XrC6xTDR/bluestar.png" alt="Blue star" className="size-12" />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Unlock Growth with the Magic Money Formula
            </h1>
          </div>
          
          <p className="text-gray-400 text-lg mb-8">
            Save, Boost EBITDA, Elevate Valuation!
          </p>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Why It Matters to Your Practice
            </h2>
            <p className="text-gray-400 max-w-4xl mx-auto leading-relaxed">
              RNA Supplies is committed to revolutionizing how dental practices manage their supply costs. Our 
              mission is to help your practice achieve significant cost savings while maintaining the highest quality 
              standards.
            </p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Savings Chart */}
        <SaveOverTime />
        
        {/* Right Side - Impact Cards */}
        <div className="space-y-8">
          {/* Business Value Impact Card */}
          <div className="bg-[#1C1C1C] rounded-2xl p-6 border border-gray-700">
            <h3 className="text-[#E2E2E2] font-medium mb-6">Business Value Impact</h3>
            
            <div className="mb-6 text-center">
              <div className="text-[#E2E2E2] text-sm mb-2">Annual EBITDA Increase</div>
              <div className="text-4xl font-bold mb-2 text-[#136BFB]">£6,000</div>
              <div className="text-sm text-[#9F9C96]">Direct impact on your bottom line</div>
            </div>
          </div>

          {/* Magic Money Formula Card */}
          <div className="bg-[#1C1C1C] rounded-2xl p-6 border border-gray-700 text-center">
            <div>
              <div className="text-[#E2E2E2] text-xl mb-2">Enhanced Business Value</div>
              <div className="font-bold text-[#136BFB] text-3xl mb-2">£45,000</div>
              <div className="text-sm mb-4 text-[#136BFB]">Based on 7.5x EBITDA multiple</div>
              <div className="text-gray-500 text-xs">
                By reducing your supply costs, you directly increase your EBITDA, which typically results in a 
                7.5x multiplier increase in your practice's overall value when it comes time to sell.
              </div>
            </div>

            <div className="flex items-center justify-center my-6">
              <span className="text-white font-medium mr-2">✨</span>
              <span className="text-white font-semibold">Magic Money Formula</span>
              <span className="text-white font-medium ml-2">✨</span>
            </div>
            
            {/* Formula Visualization */}
            <div className="flex flex-col md:flex-row items-center justify-center space-x-4 text-center">
              {[
                {
                  bg: "bg-[#1C1C1C]",
                  icon: "https://i.ibb.co/21BZy9Mn/f1a06c8b5d5e534f5f9a9e8ec5a8855fffc9d2d6.png",
                  value: "£500",
                  label: "Monthly Savings",
                },
                {
                  type: "operator",
                  symbol: "×",
                },
                {
                  bg: "bg-[#1C1C1C]",
                  icon: "https://i.ibb.co/F4yYGRmj/image.png",
                  value: "12",
                  label: "Month",
                },
                {
                  type: "operator",
                  symbol: "×",
                },
                {
                  bg: "bg-[#1C1C1C]",
                  icon: "https://i.ibb.co/fdjVXVBY/d60a35b5113a97193242f97e62f2d523408f985a.png",
                  value: "7.5",
                  label: "EBITDA multiple",
                },
                {
                  type: "operator",
                  symbol: "=",
                },
                {
                  isResult: true,
                  value: "£45,000",
                  label: "Practice Value Increase",
                },
              ].map((item, idx) =>
                item.type === "operator" ? (
                  <div key={idx} className="text-blue-400 text-2xl font-bold 
                  ml-4
                  ">
                    {item.symbol}
                  </div>
                ) : item.isResult ? (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center border border-[#6F6F6F] w-[280px] md:w-[150px] h-[160px] rounded-lg"
                  >
                    <div className="text-green-400 text-2xl font-bold">{item.value}</div>
                    <div className="text-gray-400 text-sm">{item.label}</div>
                  </div>
                ) : (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center border border-[#6F6F6F] mx-auto w-[280px] md:w-[150px] h-[160px] p-3 rounded-lg"
                  >
                    <div className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center mb-2`}>
                      <img src={item.icon} alt={item.label} className="w-8 h-8" />
                    </div>
                    <div className="text-white font-bold">{item.value}</div>
                    <div className="text-gray-400 text-sm">{item.label}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
   </Suspense>
  );
};