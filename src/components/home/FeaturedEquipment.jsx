import Image from "next/image";
import React from "react";
import bed from "../../../public/bed.png";
import teeth from "../../../public/teeth.png";
import screw from "../../../public/screw.png";
import Link from "next/link";

// const productsInfo =[
//     {
//         "name": "Dental Chairs",
//         "img": bed,
//         "des": "Modern dental chair with advanced features"
//     },
//     {
//         "name": "Dental Chairs",
//         "img": screw,
//         "des": "Modern dental chair with advanced features"
//     },
//     {
//         "name": "Dental Chairs",
//         "img": screw,
//         "des": "Modern dental chair with advanced features"
//     },
// ]

const FeaturedEquipment = () => {
  return (
    <div className="bg-[#e3edf9]">
      <div className="container mx-auto py-24">
        <div
          data-aos="fade-up"
          data-aos-duration="400"
          className="flex justify-center mb-8"
        >
          <div className="bg-[#f2fce2] rounded-3xl py-2 px-4">
            <p className="text-[#89bc69] text-sm md:font-semibold">
              Featured Equipment
            </p>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="400"
          className="flex justify-center items-center text-center flex-col gap-4"
        >
          <p className="text-[#347fd4] text-4xl font-bold">
            Premium Dental Solutions
          </p>

          <p className="text-[#5d5f61]">
            Discover our comprehensive range of high-quality dental equipment
          </p>
        </div>

        <div className="pt-24"></div>

        <div className="flex flex-col gap-24">
          {/* products images */}
          {/* dental chair */}
          <div data-aos="fade-up" data-aos-duration="800">
            <p className="text-[#4a90e2] text-2xl font-semibold text-center pb-12">
              Dental Chairs
            </p>

            {/* firsttt */}
            <div className="flex flex-col items-center ">
              <p className="text-black pb-8 font-semibold text-xl">
                Dental Units
              </p>

              <Link
                href="/product"
                className=" bg-white p-5 rounded-3xl flex flex-col  "
              >
                <p className="text-[#4a90e2] font-bold text-xl">Dental Chair</p>
                <div className="flex flex-col rounded-2xl overflow-hidden items-center">
                  <Image
                    src={bed}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <p className="text-[#5f6061]">
                  Modern dental chair with advanced features
                </p>
              </Link>
            </div>
          </div>

          {/* dental chair */}
          <div data-aos="fade-up" data-aos-duration="800">
            <p className="text-[#4a90e2] text-2xl font-semibold text-center pb-12">
              Restorative
            </p>

            {/* firsttt */}
            <div className="flex flex-col items-center">
              <p className="text-black pb-8 font-semibold text-xl">
                Restorative Materials
              </p>

              <Link
                href="/product"
                className=" bg-white p-5 rounded-3xl flex flex-col  "
              >
                <p className="text-[#4a90e2] font-bold text-xl pb-8">
                  Composite Filling
                </p>
                <div className="flex flex-col rounded-2xl overflow-hidden items-center pb-8">
                  <Image
                    className="transition-transform duration-300 hover:scale-105 overflow-hidden rounded-xl"
                    src={teeth}
                  />
                </div>
                <p className="text-[#5f6061]">
                  Light-cure composite restorative material
                </p>
              </Link>
            </div>
          </div>
          {/* dental chair */}
          <div data-aos="fade-up" data-aos-duration="800">
            <p className="text-[#4a90e2] text-2xl font-semibold text-center pb-12">
              Handpieces
            </p>

            {/* firsttt */}
            <div className="flex flex-col items-center">
              <p className="text-black pb-8 font-semibold text-xl">
                Dental Handpieces
              </p>

              <Link
                href="/product"
                className=" bg-white p-5 rounded-3xl flex flex-col  "
              >
                <p className="text-[#4a90e2] font-bold text-xl pb-8">
                  High-Speed Handpiece
                </p>
                <div 
                overflow-hidden rounded-xl
                className="items-center pb-8">
                  <Image
                    src={screw}
                    className="transition-transform duration-300 hover:scale-105 overflow-hidden rounded-xl"
                    alt="screw image"
                  />
                </div>
                <p className="text-[#5f6061]">Premium dental handpiece</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEquipment;
