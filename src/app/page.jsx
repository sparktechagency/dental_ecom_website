// app/page.js
import React from "react"; 
import Slider from "../components/home/Slider";
import Hero from "../components/home/Hero";
import ExploreByCategory from "../components/home/ExploreByCategory";
import HotSelling from "../components/home/HotSelling";
import MagicMoney from "../components/home/MagicMoney";
import AboutUs from "../components/home/AboutUs";
import Subscribe from "../components/home/Subscribe";
import SwipperSlider from './../components/Swiper Slider/SwipperSlider';

export default function Home() {
  return (
    <div>
      <SwipperSlider/>
      <Hero/>
      {/* <Slider /> */}
      {/* <ExploreByCategory />
      <HotSelling /> */}
      <MagicMoney />
      <AboutUs />
      <Subscribe />
    </div>
  );
}