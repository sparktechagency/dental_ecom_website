import React from "react";
import { IMAGE } from "../../../public/image.index";
import Subscribe from "../home/Subscribe";

const BgImage = () => {
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
      <div>
          <Subscribe/>
      </div>
    </div>
  );
};

export default BgImage;
