import { Routes, Route } from "react-router-dom";
import { useIdentification } from "./hooks/useIdentification.js";

// Pages
import Home from "./pages/Home";
import Accueil from "./pages/Accueil";
import Faq from "./pages/Faq";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import PhoneDetails from "./pages/PhoneDetails";

// Components
import NavBar from "./components/utilities/NavBar";
import Footer from "./components/utilities/Footer";

export default function App() {
  const { isLoggedIn } = useIdentification();
  return (
    <>
      <NavBar />
      <main className="min-h-[calc(100dvh-45px)] pt-24 md:min-h-[calc(100vh-134px)] md:pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          {isLoggedIn && (
            <>
              <Route path="/accueil" element={<Accueil />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/phones/:id" element={<PhoneDetails />} />
            </>
          )}
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
