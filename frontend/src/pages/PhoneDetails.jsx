import { useParams } from "react-router-dom";

import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export default function PhoneDetails() {
  const { id } = useParams();

  const slides = [
    {
      url: "../../public/assets/image/iphone-13.jpg",
    },
    {
      url: "../../public/assets/image/test.png",
    },
    {
      url: "//images.samsung.com/fr/smartphones/galaxy-z-flip4/buy/03_Product-Image_Basic-Color/4_B4_KV_MO_Blue.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="container">
      <h2 className="mt-4 text-center">Apple Iphone 10 {}</h2>
      <div>
        <div className="image-features flex justify-around">
          <div className="">
            <h3>Caractéristiques techniques</h3>
            <p className="my-4">Appareil : {} </p>
            <p className="mb-4">Marque : {} </p>
            <p className="mb-4">Modèle : {} </p>
            <p className="mb-4">Taille d'écran : {} </p>
            <p className="mb-4">Taile de la RAM : {} </p>
            <p className="mb-4">Taille de l'espace de stockage : {} </p>
            <p> Version du système d'exploitation : {} </p>
          </div>
        </div>
      </div>
      <div className="group relative flex h-[780px] w-full max-w-[1400px] flex-col items-center px-4 pt-16">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="h-3/5 w-2/4 rounded-2xl bg-cover bg-center duration-500"
        ></div>
        <div className="absolute left-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        <div className="absolute right-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="top-4 flex justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="cursor-pointer text-2xl"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
