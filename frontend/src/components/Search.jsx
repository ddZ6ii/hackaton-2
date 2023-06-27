import { Input, Space } from 'antd';

export default function Search() {
  const { Search } = Input;

  const onSearch = (value) => console.log(value);
  return <Search placeholder='Search...' onSearch={onSearch} enterButton />;
}
