import Link from 'next/link';
import { Models } from 'node-appwrite';
import Thumbnail from './Thumbnail';

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link href={file.url} target='_blank' className='file-card'>
      <div className="flex justify-between">
        <Thumbnail type={file.type} extension={file.extension} url={file.url} className='!size-20' imageClassName='!size-11' />
      </div>
    
      <div className="flex flex-col items-end justify-between">
        <p className='body-1'>{file.name}</p>
        <p className='body-1'>{file.size}</p>
      </div>
    </Link>
  );
};
export default Card;
