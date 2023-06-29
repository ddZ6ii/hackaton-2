// Packages
import { useState } from "react";
import Lottie from "lottie-react";

// Components
import AccueilContainer from "./AccueilContainer";
import LottiePhone from "../../../public/assets/lotties/data-phone.json";
import LottieLibrary from "../../../public/assets/lotties/library-phone.json";

export default function Connect() {
  const [signIn, toggle] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfVisible, setPasswordConfVisible] = useState(false);

  const handlePassVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePassConfVisibility = () => {
    setPasswordConfVisible(!passwordConfVisible);
  };

  return (
    <div className="relative flex h-[calc(100dvh-183px)] w-screen max-w-full flex-col overflow-hidden bg-neutralLight md:min-h-[calc(100dvh-134px)]">
      <div
        className={`signin-container ${
          signIn !== true
            ? "z-10 translate-y-full transform opacity-100 md:translate-x-full md:translate-y-0"
            : null
        }`}
      >
        <AccueilContainer
          isSignIn={signIn}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          passwordVisible={passwordVisible}
          passwordConfVisible={passwordConfVisible}
          handlePassVisibility={handlePassVisibility}
          handlePassConfVisibility={handlePassConfVisibility}
        />
      </div>

      <div
        className={`overlay-container ${
          signIn !== true
            ? " -translate-y-full transform md:-translate-x-full md:translate-y-0"
            : null
        }`}
      >
        <div
          className={`overlay ${
            signIn !== true
              ? "translate-y-2/4 transform md:translate-x-2/4 md:translate-y-0"
              : null
          }`}
        >
          <div
            className={`overlay-panel leftoverlay-panel justify-center gap-8 ${
              signIn !== true
                ? " translate-y-0 transform md:translate-x-0"
                : null
            }`}
          >
            <h2 className="text-xl uppercase text-default">
              Vous souhaitez consulter le catalogue des smartphones ? <br />
              C'est par içi
            </h2>
            <button
              type="button"
              className="connect-button connect-ghostButton flex items-center gap-2"
              onClick={() => toggle(true)}
            >
              Vers le catalogue de téléphone
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="ml-1 h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
            <Lottie
              loop
              autoplay
              animationData={LottieLibrary}
              className="hidden md:flex md:w-[500px] lg:w-[650px]"
            />
          </div>

          <div
            className={`overlay-panel rightoverlay-panel justify-center gap-8 ${
              signIn !== true
                ? " translate-y-[120%] transform md:translate-x-[20%] md:translate-y-0"
                : null
            }`}
          >
            <h2 className="text-xl uppercase text-default">
              Vous souhaitez ajouter un smartphone à la base de données ? <br />
              C'est par içi
            </h2>

            <button
              type="button"
              className="connect-button connect-ghostButton flex items-center gap-2"
              onClick={() => toggle(false)}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="ml-1 h-5 w-5 -scale-x-100 transform"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
              Vers l'ajout d'un téléphone
            </button>
            <Lottie
              loop
              autoplay
              animationData={LottiePhone}
              className="hidden md:flex md:w-[500px] lg:w-[700px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
