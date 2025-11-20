import React from "react";
import { IMAGE } from "../../../public/image.index";
const Buttonsgradiants = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGE.image.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        // height: "100vh",
      }}
      className="bg-fixed"
    >
      <div className="container mx-auto text-white p-8 relative z-10">
        <div className="flex gap-12 flex-wrap justify-center">
          {/* first button */}
          <div className="bg-gradient-to-r from-[#f77029] to-[#db49e3] py-3 rounded-lg ">
            <p className="text-white font-medium px-8">Dental Chairs</p>
          </div>
          {/* second button */}
          <div className="bg-gradient-to-r from-[#895df6] to-[#179fea] py-3 rounded-lg ">
            <p className="text-white font-medium px-8">
              Sterilization Equipment
            </p>
          </div>
          {/* third button */}
          <div className="bg-gradient-to-r from-[#f77029] to-[#db49e3] py-3 rounded-lg ">
            <p className="text-white font-medium px-8">Consumables</p>
          </div>
          {/* foruth button */}
          <div className="bg-gradient-to-r from-[#895df6] to-[#179fea] py-3 rounded-lg ">
            <p className="text-white font-medium px-8">Dental Instruments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buttonsgradiants;
