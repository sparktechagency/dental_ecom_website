// app/page.js
import React from "react"; 
import Slider from "../components/home/Slider";
import Hero from "../components/home/Hero";
import ExploreByCategory from "../components/home/ExploreByCategory";
import HotSelling from "../components/home/HotSelling";
import MagicMoney from "../components/home/MagicMoney";
import TextWrappper from "../components/home/TextWrappper";
import Buttonsgradiants from "../components/home/Buttonsgradiants";
import FreeShipping from "../components/home/FreeShipping";
import PaymentCards from "../components/home/PaymentCards";
import FeaturedEquipment from "../components/home/FeaturedEquipment";
import BgImage from "../components/bgImage/BgImage";
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
      <TextWrappper/>
      <Buttonsgradiants/>
      <FeaturedEquipment/>
      <FreeShipping/>
      <BgImage/>
      <PaymentCards/>
     
    </div>
  );
}