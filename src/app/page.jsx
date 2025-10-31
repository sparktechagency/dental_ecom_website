// app/page.js
import React from "react"; 
import Slider from "../components/home/Slider";
import ExploreByCategory from "../components/home/ExploreByCategory";
import HotSelling from "../components/home/HotSelling";
import MagicMoney from "../components/home/MagicMoney";
import AboutUs from "../components/home/AboutUs";
import Subscribe from "../components/home/Subscribe";

export default function Home() {
  return (
    <div>
      <Slider />
      <ExploreByCategory />
      <HotSelling />
      <MagicMoney />
      <AboutUs />
      <Subscribe />
    </div>
  );
}