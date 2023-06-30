import { useState } from 'react';

// Components
import Searchbar from '../utilities/Search';
import DropdownLi from '../utilities/DropdownLi';

export default function Dropdown({ title, items }) {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div>
      <button
        className='flex min-w-[200px] items-center justify-between rounded-lg bg-primary p-3 text-center text-sm text-white hover:bg-primary/75 focus:outline-none'
        type='button'
        onClick={() => setIsToggled(!isToggled)}
      >
        {title}
        <svg
          className='flex h-4 w-4 justify-end'
          aria-hidden='true'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>
      {isToggled && (
        <div className='w-50 absolute z-10 mt-2 rounded-lg border border-primary/25 bg-white shadow'>
          <div className='p-3'>
            <Searchbar className='relative w-full' />
          </div>
          <ul
            className='h-48 px-3 pb-3 text-sm text-neutralDark'
            aria-labelledby='dropdownSearchButton'
          >
            {Array.isArray(items) && items.length > 0 ? (
              items.map((item) => <DropdownLi key={item.id} item={item} />)
            ) : (
              <li>No items found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
