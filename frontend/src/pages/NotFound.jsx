// Packages
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen justify-center">
      <div className="flex flex-row items-center gap-6">
        <img
          className="rounded-xl md:h-80"
          src="../../public/assets/image/broken-phone.webp"
          alt="error_404"
        />
        <div className="not-found-text">
          <p className="text-lg font-extrabold text-neutralDark dark:text-neutralLight md:text-2xl">
            La page que vous recherchez n'a pu être trouvée
          </p>
          <p>
            Nous sommes désolés, il est probable que la page demandée ait été
            supprimée, que son nom ait été modifié ou qu'elle ne soit pas
            accessible actuellement.
          </p>
          <button
            onClick={() => navigate("/accueil")}
            className="mt-4 rounded-3xl bg-primary p-2 text-white"
          >
            Retour à la page d'accueil
          </button>
        </div>
      </div>
    </section>
  );
}
