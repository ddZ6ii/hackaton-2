import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

import styles from "../css/PhoneDetails.module.css"

export default function PhoneDetails() {
  const [phone, setPhone] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:5000/smartphones/").then((res) => {
      const phones = res.data;
      const filteredPhone = phones.filter((phone) => phone.id_phone == id);
      console.log(filteredPhone[0]);
      setPhone(filteredPhone[0]);
    });
  }, []);

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

  useEffect(() => {
    if (phone.thumbnail_1 && phone.thumbnail_2 && phone.thumbnail_3) {
      setCurrentIndex(0);
    }
  }, [phone]);

  const imagePath = "../public/assets/image/";

  const slides = [
    `${imagePath}${phone.thumbnail_1}`,
    `${imagePath}${phone.thumbnail_2}`,
    `${imagePath}${phone.thumbnail_3}`,
  ];

  return (
    <section className={`${styles.phone_details_container} sm:flex sm:flex-row justify-center items-center`}>
      <div>
        <h2 className="mb-4 mt-12 text-center">
          {phone.brand} {phone.model}
        </h2>
        <div className="features flex justify-around">
          <div className="flex flex-col">
            <h3>Caractéristiques techniques</h3>
            <p className="mb-4">Marque : {phone.brand} </p>
            <p className="mb-4">Modèle : {phone.model} </p>
            <p className="mb-4">Taille d'écran : {phone.screen} pouces </p>
            <p className="mb-4">Taile de la RAM : {phone.RAM} Go </p>
            <p className="mb-4">
              Taille de l'espace de stockage : {phone.storage} Go{" "}
            </p>
            <p> Système d'exploitation : {phone.OS} </p>
          </div>
        </div>
      </div>
      <div className={`group relative mt-8 flex w-1/2 flex-col items-center justify-center`}>
        <img src={slides[currentIndex]} className="h-96 rounded-xl" />
        <div className={`${styles.chevron_icon} absolute left-2 top-[50%] -translate-x-0 -translate-y-1/2 cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block`}>
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        <div className={`${styles.chevron_icon} absolute right-2 top-[50%] -translate-x-0 -translate-y-1/2 cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block`}>
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="top-4 flex justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`cursor-pointer text-2xl ${
                slideIndex === currentIndex ? "text-primary" : ""
              }`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
