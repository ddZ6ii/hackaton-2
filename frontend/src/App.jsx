import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Accueil from "./pages/Accueil";
import Faq from "./pages/Faq";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import PhoneDetails from "./pages/PhoneDetails";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="min-h-[calc(100dvh-100px)] pt-10 md:min-h-[calc(100dvh-40px)] md:pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/account" element={<Account />} />
          <Route path="/phones/:id" element={<PhoneDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
