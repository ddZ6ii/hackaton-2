export default function DropdownLi({ item }) {
  return (
    <li>
      <div className='flex items-center rounded pl-2 hover:bg-gray-100'>
        <input
          type='checkbox'
          defaultChecked=''
          className='h-4 w-4 rounded border-neutral bg-gray-100 text-primary focus:outline-none'
        />
        <label
          htmlFor={`checkbox-item-${item.id}`}
          className='ml-2 rounded py-2 text-sm font-medium text-gray-500'
        >
          {item.name}
        </label>
      </div>
    </li>
  );
}
