import { useState } from 'react';
import RowQuestion from '../components/RowQuestion';

import '../App.css';

import faqData from '../data/faq.json';

export default function Faq() {
  const [faqs, setFaqs] = useState(faqData);

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
    <section className='flex items-center justify-center'>
      <h2 className='text-xl uppercase'>FAQ</h2>
      <div className='faqs'>
        {faqs.map((faq, index) => (
          <RowQuestion
            faq={faq}
            index={index}
            key={index}
            toggleFAQ={toggleFAQ}
          />
        ))}
        <img
          className='absolute bottom-0 right-0 -z-10 w-[500px]'
          src='../assets/icons/logo.svg'
        ></img>
      </div>
    </section>
  );
}
