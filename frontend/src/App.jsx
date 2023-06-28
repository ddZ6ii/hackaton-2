import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Accueil from "./pages/Accueil";
import Catalogue from "./pages/Catalogue";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="min-h-[calc(100dvh-80px)] pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
