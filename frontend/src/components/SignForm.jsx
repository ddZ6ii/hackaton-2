import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIdentification } from '../hooks/useIdentification';
import { toast } from 'react-toastify';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';

export default function SignForm() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin } =
    useIdentification();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const API = `${import.meta.env.VITE_BACKEND_URL}/login`;

  const handlePassVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { email, password };
    axios
      .post(API, body, { withCredentials: true })
      .then((res) => {
        setLoading(false);
        // notify user
        toast.success('vous etes maintenant connecte', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'dark',
        });
        // get user info and update context (authentication token is saved as a cookie)
        setIsLoggedIn(true);
        setIsAdmin(res.data.is_admin);
        // page redirection
        navigate('/accueil');
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error(`${error.response.data}`, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'dark',
        });
      });
  };

  const passwordType = passwordVisible ? 'text' : 'password';

  return (
    <form
      className='mx-24 flex w-full flex-col items-center gap-8 text-center md:max-w-[500px]'
      onSubmit={handleSubmit}
    >
      <h2 className='text-xl uppercase'>Connexion</h2>
      <input
        type='email'
        placeholder='Email'
        className=' w-full rounded border bg-neutralLight p-3 focus:border-primary focus:outline-none'
        id='email-login'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        pattern='.{5,25}'
        required
        autoComplete='on'
        title='5 to 25 characters'
      />
      <div className='relative flex w-full items-center'>
        <input
          type={passwordType}
          placeholder='Mot de passe'
          className='w-full rounded border bg-neutralLight p-3 focus:border-primary focus:outline-none'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          pattern='.{4,12}'
          required
          title='4 to 12 characters'
        />
        {/* eslint-disable */}
        <span className='absolute right-3 flex w-5'>
          {passwordVisible ? (
            <svg
              width='82'
              height='82'
              viewBox='0 0 82 82'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='cursor-pointer'
              onClick={handlePassVisibility}
            >
              <g clipPath='#AAAAAA'>
                <path
                  d='M54.9278 65.7301L46.7116 57.5088C43.5342 58.6448 40.0996 58.8552 36.8074 58.1154C33.5151 57.3757 30.5006 55.7163 28.1146 53.3303C25.7286 50.9443 24.0692 47.9298 23.3295 44.6375C22.5897 41.3453 22.8001 37.9107 23.9361 34.7333L13.4494 24.2466C4.77501 31.9589 0 40.725 0 40.725C0 40.725 15.2719 68.7234 40.725 68.7234C45.6141 68.7065 50.4478 67.6877 54.9278 65.7301ZM26.5222 15.7199C31.0022 13.7621 35.8359 12.7434 40.725 12.7266C66.1781 12.7266 81.45 40.725 81.45 40.725C81.45 40.725 76.6699 49.486 68.0057 57.2084L57.5088 46.7116C58.6448 43.5342 58.8552 40.0996 58.1154 36.8074C57.3757 33.5151 55.7163 30.5006 53.3303 28.1146C50.9443 25.7286 47.9298 24.0692 44.6375 23.3295C41.3453 22.5897 37.9107 22.8001 34.7333 23.9361L26.5222 15.7199Z'
                  className='fill-[#B2B2B2]'
                />
                <path
                  d='M28.1254 38.9229C27.8454 40.8793 28.0249 42.874 28.6496 44.749C29.2743 46.624 30.3271 48.3277 31.7246 49.7252C33.122 51.1226 34.8258 52.1754 36.7007 52.8001C38.5757 53.4248 40.5704 53.6043 42.5268 53.3243L28.1254 38.9229ZM53.324 42.5271L38.9227 28.1206C40.879 27.8406 42.8737 28.02 44.7487 28.6447C46.6237 29.2695 48.3274 30.3223 49.7249 31.7197C51.1224 33.1172 52.1752 34.8209 52.7999 36.6959C53.4246 38.5709 53.6041 40.5656 53.324 42.522V42.5271ZM69.4664 73.0708L8.37891 11.9833L11.9831 8.37915L73.0706 69.4667L69.4664 73.0708Z'
                  className='fill-[#B2B2B2]'
                />
              </g>
            </svg>
          ) : (
            <svg
              width='25'
              height='18'
              viewBox='0 0 25 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='cursor-pointer'
              onClick={handlePassVisibility}
            >
              <path
                d='M16.4062 9C16.4062 10.036 15.9947 11.0296 15.2621 11.7621C14.5296 12.4947 13.536 12.9062 12.5 12.9062C11.464 12.9062 10.4704 12.4947 9.73786 11.7621C9.0053 11.0296 8.59375 10.036 8.59375 9C8.59375 7.964 9.0053 6.97043 9.73786 6.23786C10.4704 5.5053 11.464 5.09375 12.5 5.09375C13.536 5.09375 14.5296 5.5053 15.2621 6.23786C15.9947 6.97043 16.4062 7.964 16.4062 9Z'
                className='fill-[#B2B2B2]'
              />
              <path
                d='M0 9C0 9 4.6875 0.40625 12.5 0.40625C20.3125 0.40625 25 9 25 9C25 9 20.3125 17.5938 12.5 17.5938C4.6875 17.5938 0 9 0 9ZM12.5 14.4688C13.9504 14.4688 15.3414 13.8926 16.367 12.867C17.3926 11.8414 17.9688 10.4504 17.9688 9C17.9688 7.5496 17.3926 6.1586 16.367 5.13301C15.3414 4.10742 13.9504 3.53125 12.5 3.53125C11.0496 3.53125 9.6586 4.10742 8.63301 5.13301C7.60742 6.1586 7.03125 7.5496 7.03125 9C7.03125 10.4504 7.60742 11.8414 8.63301 12.867C9.6586 13.8926 11.0496 14.4687 12.5 14.4688Z'
                className='fill-[#B2B2B2]'
              />
            </svg>
          )}
        </span>
      </div>
      <button
        className='w-full items-center rounded border-0 bg-primary px-3 py-1 text-base text-neutralLight hover:bg-primary/75 md:mt-0'
        type='submit'
      >
        Se connecter
      </button>
    </form>
  );
}
