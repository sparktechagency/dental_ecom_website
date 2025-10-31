
import React from "react";

export default function Checkbox({ isSelected }) {
    return (
        <div className="relative">
            <div
                className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                    isSelected
                        ? "bg-[#136BFB] border-[#136BFB]"
                        : "bg-white border-gray-300"
                }`}
            >
                {isSelected && (
                    <svg
                        className="w-3 h-3 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M20 6L9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                    </svg>
                )}
            </div>
        </div>
    );
}