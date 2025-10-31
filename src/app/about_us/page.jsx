import React, { Suspense } from "react";
import AboutUs from "./AboutUs";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AboutUs />
      </Suspense>
    </div>
  );
};

export default page;
