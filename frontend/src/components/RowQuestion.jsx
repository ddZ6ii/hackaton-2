import '../App.css';

export default function RowQuestion({ faq, index, toggleFAQ }) {
  return (
    <div
      className={'faq ' + (faq.open ? 'open' : '')}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className='faq-question'>{faq.question}</div>
      <div className='faq-answer rounded-full bg-neutralLight/80 px-8 py-4 text-neutralDark'>
        {faq.answer}
      </div>
    </div>
  );
}
