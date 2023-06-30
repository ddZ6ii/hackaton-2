import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className='min-h-screen justify-start text-default'>
      <div className='flex flex-col items-center gap-6 md:flex-row'>
        <img
          className='rounded-xl md:h-80'
          src='../../public/assets/image/broken-phone.webp'
          alt='error_404'
        />
        <div className='not-found-text'>
          <p className='text-lg font-extrabold md:text-2xl'>
            La page que vous recherchez n'a pu être trouvée
          </p>
          <p>
            Nous sommes désolés, il est probable que la page demandée ait été
            supprimée, que son nom ait été modifié ou qu'elle ne soit pas
            accessible actuellement.
          </p>
          <button
            onClick={() => navigate('/')}
            className='mt-4 rounded-3xl bg-primary p-2 text-white'
          >
            Retour à la page d'accueil
          </button>
        </div>
      </div>
    </section>
  );
}
