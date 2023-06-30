import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <section className="items-center justify-center md:grid md:min-h-[calc(100dvh-134px)] md:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-8 md:w-full md:items-start">
        <h1 className="uppercase">
          L'accès à la technologie pour tous! <br /> Un smartphone à la fois.
        </h1>
        <p className="text-base font-normal">
          Ensemble, nous sommes déterminés à faire une différence dans la vie
          des personnes exclues, en leur offrant les opportunités et les outils
          nécessaires pour s'épanouir dans le monde numérique.
        </p>
        <NavLink to="compte">
          <button type="button" className="connect-ghostButton">
            Se connecter
          </button>
        </NavLink>
      </div>
      <img
        className="z-20 hidden w-full md:block"
        src="../assets/image/landing-page.png"
        alt="personne avec telephone"
      />
      <img
        className="absolute bottom-0 right-0 -z-10 flex w-[500px]"
        alt="lacollecte.tech"
        src="../assets/icons/logo.svg"
      ></img>
    </section>
  );
}
