'use client';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import { cn, convertFileToUrl, getFileType } from '@/lib/utils';
import Image from 'next/image';
import Thumbnail from './Thumbnail';
import { MAX_FILE_SIZE } from '@/app/constants';
import { toast } from 'sonner';
import { uploadFile } from '@/lib/actions/file.actions';
import { usePathname } from 'next/navigation';
import { showToast } from './ToastMessage';

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const path = usePathname();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        // display toast message if the file size is larger than 50MB
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );
          return toast.custom((t) => (
            <div className='error-toast' onClick={() => toast.dismiss(t)}>
              <p className='body-1 text-white'>
                <span className='font-semibold'>{file.name}</span> is too large.
                Max file size is 50MB.
              </p>
            </div>
          ));
        }

        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name)
              );
             showToast(file.name, 'uploade')
            }
          }
        );
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className='cursor-pointer'>
      <input {...getInputProps()} />
      <Button type='button' className={cn('uploader-button', className)}>
        <Image
          src='/assets/icons/upload.svg'
          alt='upload'
          width={24}
          height={24}
        />{' '}
        <p>Upload</p>
      </Button>

      {files.length > 0 && (
        <ul className='uploader-preview-list'>
          <h4 className='h4 text-light-100'>Uploading</h4>

          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={`${file.name}-${index}`}
                className='uploader-preview-item'
              >
                <div className='flex items-center gap-3'>
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                    className='bg-brand text-brand'
                  />

                  <div className='preview-item-name'>
                    {file.name}
                    <Image
                      src='/assets/icons/file-loader-2.gif'
                      width={80}
                      height={26}
                      alt='Loader'
                    />
                  </div>
                </div>

                <Image
                  src='/assets/icons/remove.svg'
                  width={24}
                  height={24}
                  alt='Remove'
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default FileUploader;
