import Image from 'next/image';

const Search = () => {
  return (
    <div className='search'>
      <div className='search-input-wrapper'>
        <Image
          src='/assets/icons/search.svg'
          alt='Search'
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};
export default Search;
