import { useState } from "react";
import "../App.css";
import RowQuestion from "../components/RowQuestion";
export default function Faq() {
  const [faqs, setFaqs] = useState([
    {
      question: "QUESTION 1?",
      answer: "REPONSE 1.",
      open: true,
    },
    {
      question: "QUESTION 2?",
      answer: "REPONSE 2.",
      open: false,
    },
    {
      question: "QUESTION 3?",
      answer: "REPONSE 3.",
      open: false,
    },
    {
      question: "QUESTION 4?",
      answer: "REPONSE 4.",
      open: false,
    },
    {
      question: "QUESTION 5?",
      answer: "REPONSE 5.",
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
    <section>
      <h2>FAQ Page</h2>
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
