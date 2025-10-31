"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import { useFetchAllProcedureQuery } from "@/redux/feature/procedure/procedure";
import PageHeading from "@/components/shared/PageHeading";
import { getBaseUrl } from "@/utils/getBaseUrl";
import Link from "next/link";

export default function ProcedureGuide() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: procedure, isLoading, error } = useFetchAllProcedureQuery({});

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500">Error loading procedures. Please try again later.</p>
      </div>
    );
  }

  return (
    <main className="py-10 container mx-auto px-5 md:px-0">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-2">
        <PageHeading title="Browse by Dental Procedure" />
      </header>

      {/* Procedure Cards */}
      <div className="space-y-5 flex flex-col gap-5">
        {procedure?.map((procedure) => (
          <div
            key={procedure._id}
            className="relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            <div className="relative h-[20rem] md:h-[25rem] overflow-hidden">
              <img
                title={procedure?.name}
                src={`${getBaseUrl()}${procedure.imageUrl}`}
                alt={procedure.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {procedure.title}
                  </h3>
                  <p className="text-white/90 text-lg mb-4 max-w-2xl leading-relaxed">
                    {procedure.description}
                  </p>
                  <p className="text-white/80 text-base font-medium">
                    Products Included: {procedure.productsIncluded} Items
                  </p>
                </div>

                <div className="flex gap-2 mt-5">
                  <Link
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white md:px-6 px-3 md:py-3 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                    href={`/procedure_guide/${procedure._id}`}
                  >
                    <span>View Products</span>
                    <FaArrowRightLong className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}