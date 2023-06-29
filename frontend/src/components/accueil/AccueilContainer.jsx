import React from "react";

import Tables from "../catalogue/Tables";

export default function AccueilContainer({ isSignIn }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-white px-12 text-center ">
      <h2 className="font-header text-neutralDarkest dark:text-neutralLightest text-xl uppercase">
        {isSignIn ? "Catalogue" : "Ajout d'un téléphone"}
      </h2>

      {isSignIn ? <Tables /> : <div>This is a test</div>}
    </div>
  );
}
