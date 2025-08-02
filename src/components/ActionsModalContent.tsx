import { Models } from 'node-appwrite';
import Thumbnail from './Thumbnail';
import FormattedDateTime from './FormattedDateTime';
import { convertFileSize, formatDateTime } from '@/lib/utils';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Image from 'next/image';

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div className='file-details-thumbnail'>
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div className='flex flex-col'>
      <p className='subtitle-2'>{file.name}</p>
      <FormattedDateTime date={file.$createdAt} className='caption mt-0.5' />
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className='flex'>
    <p className='file-details-label'>{label}</p>
    <p className='file-details-value'>{value}</p>
  </div>
);

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className='space-y-4 px-2 pt-2'>
        <DetailRow label='Format:' value={file.extension} />
        <DetailRow label='Size:' value={convertFileSize(file.size)} />
        <DetailRow label='Owner:' value={file.owner.fullName} />
        <DetailRow label='Last Edit:' value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className='share-wrapper pb-4'>
        <p className='subtitle-2 pl-1 text-light-100'>
          Share file with other users
        </p>
        <Input
          type='email'
          placeholder='Enter email address'
          onChange={(e) => onInputChange(e.target.value.trim().split(','))}
          className='share-input-field'
        />
        <div className='pt-4'>
          <div className='flex justify-between'>
            <p className='subtitle-2 text-light-100'>Shared with</p>
            <p className='subtitle-2 text-light-200'>
              {file.users.length} users
            </p>
          </div>
          <ul className='pt-2'>
            {file.users.map((email: string) => (
              <li
                key={email}
                className='flex items-center justify-between gap-2'
              >
                <p className='subtitle-2'>{email}</p>
                <Button onClick={() => onRemove(email)}>
                  <Image
                    src='/assets/icons/remove.svg'
                    alt='Remove'
                    width={24}
                    height={24}
                    className='remove-icon'
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
