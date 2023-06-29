import React from "react";

import Tables from "../catalogue/Tables";
import PhoneForm from "./PhoneForm";

export default function AccueilContainer({ isSignIn }) {
  return (
    <div className="flex h-full flex-col items-center justify-start gap-8 bg-white px-12 pt-8 text-center ">
      <h2 className="font-header text-neutralDarkest dark:text-neutralLightest text-xl uppercase">
        {isSignIn ? "Catalogue" : "Ajout d'un téléphone"}
      </h2>

      {isSignIn ? <Tables /> : <PhoneForm />}
    </div>
  );
}
