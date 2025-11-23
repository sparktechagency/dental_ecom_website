// app/page.js
import React from "react"; 
import Hero from "../components/home/Hero";
import MagicMoney from "../components/home/MagicMoney";
import TextWrappper from "../components/home/TextWrappper";
import Buttonsgradiants from "../components/home/Buttonsgradiants";
import FreeShipping from "../components/home/FreeShipping";
import PaymentCards from "../components/home/PaymentCards";
import FeaturedEquipment from "../components/home/FeaturedEquipment";
import BgImage from "../components/bgImage/BgImage";
import SwipperSlider from './../components/Swiper Slider/SwipperSlider';

export default function Home() {
  return (
    <div>
      <SwipperSlider/>
      <Hero/>
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