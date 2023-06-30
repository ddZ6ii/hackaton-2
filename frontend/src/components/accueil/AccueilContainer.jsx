import React from "react";

import Tables from "../catalogue/Tables";
import PhoneForm from "./PhoneForm";

export default function AccueilContainer({ isSignIn }) {
  const isMobile = window.innerWidth <= 768;

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + convertToCSV(data);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((item) => Object.values(item).join(","));
    return [header, ...rows].join("\n");
  };

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
