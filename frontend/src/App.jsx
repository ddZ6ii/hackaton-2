import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication.js';

// Pages
import Home from './pages/Home';
import Accueil from './pages/Accueil';
import Faq from './pages/Faq';
import Account from './pages/Account';
import NotFound from './pages/NotFound';
import PhoneDetails from './pages/PhoneDetails';

// Components
import NavBar from './components/utilities/NavBar';
import Footer from './components/utilities/Footer';

export default function App() {
  const { isLoggedIn, setIsLoggedIn } = useAuthentication();

  // check local storage if user is still logged in (after page refresh)
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('isUserCurrentlyLoggedIn');
    if (JSON.parse(isUserLoggedIn) === true) setIsLoggedIn(true);
  }, []);
  return (
    <>
      <NavBar />
      <main className='min-h-[calc(100dvh-45px)] pt-24 md:min-h-[calc(100vh-134px)] md:pt-0'>
        <Routes>
          <Route path='/' element={<Home />} />
          {isLoggedIn && (
            <>
              <Route path='/accueil' element={<Accueil />} />
              <Route path='/faq' element={<Faq />} />
              <Route path='/smartphones/:id' element={<PhoneDetails />} />
            </>
          )}
          <Route path='/compte' element={<Account />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
