import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <header className='fixed z-20 w-full bg-neutralDarkest text-neutralLightest'>
      <nav className='flex w-full flex-col flex-wrap items-center justify-between px-8 md:flex-row'>
        <NavLink
          to='/'
          className='title-font mb-4 flex items-center font-medium md:mb-0'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='h-10 w-10 rounded-full bg-primaryLight p-2 text-white'
            viewBox='0 0 24 24'
          >
            <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
          </svg>
          <span className='ml-3 text-xl'>Company name</span>
        </NavLink>
        <div className='flex flex-wrap items-center'>
          <NavLink to='/' className='mr-5 hover:text-primaryLight'>
            Home
          </NavLink>
          <NavLink to='contact' className='mr-5 hover:text-primaryLight'>
            Contact
          </NavLink>
          <NavLink to='about' className='mr-5 hover:text-primaryLight'>
            About
          </NavLink>

          <NavLink to='account'>
            <button className='inline-flex items-center rounded border-0 bg-neutralLight px-3 py-1 text-base hover:bg-primaryLight hover:text-neutralLightest focus:outline-none md:mt-0'>
              Log in
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
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
