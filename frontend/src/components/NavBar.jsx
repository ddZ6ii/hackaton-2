import { NavLink } from "react-router-dom";

import "../app.css";
import { useState } from "react";

export default function NavBar() {
  const [active, setActive] = useState("");

  const handleClick = () => {
    setActive(active === "" ? "active" : "");
  };

  const handleClickLink = () => {
    setActive("");
  };

  return (
    <header className="bg-neutralDarkest text-neutralLightest fixed z-20 w-full">
      <nav className="flex w-full flex-col flex-wrap justify-between px-8 py-3 shadow md:flex-row md:items-center">
        <NavLink to="/" className="flex md:mb-0 md:items-center">
          <img src="../assets/icons/logo2.svg" alt="emmaus-connect" />
        </NavLink>

        <div className="hidden items-center text-base md:flex">
          <NavLink to="/" className="mr-5 hover:text-primary">
            Accueil
          </NavLink>
          <NavLink to="contact" className="mr-5 hover:text-primary">
            Catalogue
          </NavLink>
          <NavLink to="about" className="mr-5 hover:text-primary">
            FAQ
          </NavLink>

          <NavLink to="account">
            <button className="inline-flex items-center rounded border-0 bg-primary px-3 py-1 text-sm text-neutralLight hover:bg-primary/75 focus:outline-none md:mt-0">
              Se connecter
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="ml-1 h-4 w-4"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </NavLink>
        </div>

        <label className="burger absolute right-5 top-[25%] z-10 sm:hidden">
          <input
            type="checkbox"
            onChange={handleClick}
            checked={active === "active"}
          />
          <span className="burgerline">{}</span>
          <span className="burgerline">{}</span>
          <span className="burgerline">{}</span>
        </label>

        <nav
          className={`menu absolute right-0 top-[0px] z-20 flex w-[140px] translate-y-[-150%] flex-col rounded-bl-md py-20 sm:hidden ${active} items-center gap-5 bg-primary`}
        >
          <NavLink
            to="/accueil"
            onClick={handleClickLink}
            className={`text-center text-neutralLight`}
          >
            Accueil
          </NavLink>
          <NavLink
            to="/catalogue"
            onClick={handleClickLink}
            className={`text-center text-neutralLight`}
          >
            Catalogue
          </NavLink>
          <NavLink
            to="/faq"
            onClick={handleClickLink}
            className={`text-center text-neutralLight`}
          >
            FAQ
          </NavLink>
          <NavLink
            to="/account"
            onClick={handleClickLink}
            className={`text-center text-neutralLight`}
          >
            Se connecter
          </NavLink>
        </nav>
      </nav>
    </header>
  );
}
