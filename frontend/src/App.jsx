import { Routes, Route } from 'react-router-dom';

// Pages
import About from './pages/About';
import Account from './pages/Account';
import Contact from './pages/Contact';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <NavBar />
      <main className='min-h-[calc(100dvh-80px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/account' element={<Account />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
