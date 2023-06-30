import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useIdentification } from '../../hooks/useIdentification';

import '../../app.css';

export default function NavBar() {
  const navigate = useNavigate();
  const [active, setActive] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useIdentification();

  const handleClick = () => {
    setActive(active === '' ? 'active' : '');
  };

  const handleClickLink = () => {
    setActive('');
  };

  const handleDisconnect = () => {
    //update userContext
    setIsLoggedIn(false);
    // remove jwt from cookie
    // page redirection
    navigate('/');
  };

  return (
    <header className='fixed z-20 w-full bg-white md:sticky'>
      <nav className='flex w-full flex-col flex-wrap justify-between px-8 py-3 shadow md:flex-row md:items-center'>
        <NavLink to='/' className='flex md:mb-0 md:items-center'>
          <img src='../assets/icons/logo2.svg' alt='emmaus-connect' />
        </NavLink>

        {isLoggedIn && (
          <div className='hidden items-center text-base md:flex'>
            <NavLink to='accueil' className='mr-5 hover:text-primary'>
              Accueil
            </NavLink>
            <NavLink to='faq' className='mr-5 hover:text-primary'>
              FAQ
            </NavLink>
            <button
              className='inline-flex items-center rounded border-0 bg-primary px-3 py-1 text-sm text-neutralLight hover:bg-primary/75 focus:outline-none md:mt-0'
              onClick={handleDisconnect}
            >
              Se déconnecter
              <svg
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='ml-1 h-4 w-4'
                viewBox='0 0 24 24'
              >
                <path d='M5 12h14M12 5l7 7-7 7'></path>
              </svg>
            </button>
          </div>
        )}
      </nav>

      {isLoggedIn && (
        <nav>
          <label className='burger absolute right-5 top-[25%] z-10 sm:hidden'>
            <input
              type='checkbox'
              onChange={handleClick}
              checked={active === 'active'}
            />
            <span className='burgerline'>{}</span>
            <span className='burgerline'>{}</span>
            <span className='burgerline'>{}</span>
          </label>
          <div
            className={`menu absolute right-0 top-[0px] z-20 flex w-[140px] translate-y-[-150%] flex-col rounded-bl-md py-20 sm:hidden ${active} items-center gap-5 bg-primary`}
          >
            <NavLink
              to='accueil'
              onClick={handleClickLink}
              className={`text-center text-neutralLight`}
            >
              Accueil
            </NavLink>
            <NavLink
              to='faq'
              onClick={handleClickLink}
              className={`text-center text-neutralLight`}
            >
              FAQ
            </NavLink>
            <button
              type='button'
              className={`text-center text-neutralLight`}
              onClick={handleDisconnect}
            >
              Se déconnecter
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
