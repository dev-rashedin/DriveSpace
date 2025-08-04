"use client"
import Image from 'next/image';
import { useState } from 'react';
import { Input } from './ui/input';

const Search = () => {

  const [query, setQuery] = useState('');
  
  return (
    <div className='search'>
      <div className='search-input-wrapper'>
        <Image
          src='/assets/icons/search.svg'
          alt='Search'
          width={24}
          height={24}
        />
        <Input value={query} placeholder='Search...' className='search-input' onChange={(e) => setQuery(e.target.value)} />
      </div>
    </div>
  );
};
export default Search;
