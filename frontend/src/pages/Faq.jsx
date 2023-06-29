import { useState } from "react";
import "../App.css";
import RowQuestion from "../components/RowQuestion";
export default function Faq() {
  const [faqs, setFaqs] = useState([
    {
      question: "Comment puis-je me connecter?",
      answer:
        "Il suffit d'appuyer sur 'Se connecter' et de rentrer les informations demandées par votre centre.",
      open: true,
    },
    {
      question:
        "Quelles sont les démarques à effectuer pour un téléphone qui ne fonctionne pas?",
      answer:
        "Vous pouvez contacter le service client ou voir votre réferent de centre.",
      open: false,
    },
    {
      question: "Pouvons-nous régler le télèphone en plusieurs fois?",
      answer:
        "Il est possible de régler en plusieurs fois, voir les modalités auprès de votre réferent.",
      open: false,
    },
    {
      question:
        "Notre recherche sera-t-elle mémoriser à chaque connexion sur l'application?",
      answer:
        "Un historique de commande peut être effectuée, mais en faire la demande.",
      open: false,
    },
    {
      question: "Peut-on être livré directement à son domicile?",
      answer: "Ces modalités sont à en discuter avec le réferent du centre.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <section className="flex items-center justify-center">
      <h2 className="text-xl uppercase">FAQ Page</h2>
      <div className="faqs">
        {faqs.map((faq, index) => (
          <RowQuestion
            faq={faq}
            index={index}
            key={index}
            toggleFAQ={toggleFAQ}
          />
        ))}
      </div>
    </section>
  );
}
