import Image from 'next/image';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen'>
      <section className='bg-brand p-10'>
        <div>
          <div className='flex items-center gap-3'>
            <Image
              src='/logo.png'
              alt='logo'
              width={60}
              height={60}
              className='h-auto'
            />
            <h1 className='text-4xl font-semibold text-white'>DriveSpace</h1>
          </div>
          <div className='space-y-5 text-white'>
            <h1 className='h1'>Manage your files the best way</h1>
            <p className='body-1'>
              This is a place where you can store all your documents.
            </p>
          </div>
          <Image
            src='/assets/images/files.png'
            alt='Files'
            width={342}
            height={342}
            className='transition-all hover:rotate-2 hover:scale-105'
          />
        </div>
      </section>
      {children}
    </div>
  );
};
export default layout;
