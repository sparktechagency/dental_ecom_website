import React from "react";
export default function PageHeading({ title }) {
    return (
        <div className="flex items-center justify-between my-14">
            <div className="border border-l-6 border-[#136BFB] h-16 rounded-r-full"></div>
            <h1 className="text-3xl font-bold text-white pl-5">{title}</h1>
        </div>
    );
}