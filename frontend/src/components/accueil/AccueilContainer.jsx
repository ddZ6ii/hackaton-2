import React from "react";

import Tables from "../accueil/Tables";
import PhoneForm from "./PhoneForm";

export default function AccueilContainer({ isSignIn }) {
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="flex flex-col items-center justify-start gap-8 bg-white px-12 pt-32 text-center ">
      <h2 className="text-xl uppercase">
        {isMobile
          ? "Ajout d'un téléphone"
          : isSignIn
          ? "Catalogue"
          : "Ajout d'un téléphone"}
      </h2>
      {isMobile ? <PhoneForm /> : isSignIn ? <Tables /> : <PhoneForm />}
    </div>
  );
}
