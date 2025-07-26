import Logo from '@/components/ui/logo';
import Image from 'next/image';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen'>
      {/* left section */}
      <section className='hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5'>
        <div className='flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12'>
          <Logo type='desktop' />
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

      {/* right section */}
      <section className='flex flex-1 flex-col items-center justify-center  bg-brand p-4  py-10 lg:bg-lime lg:p-10 lg:py-0'>
        <div className='lg:hidden'>
          <Logo type='mobile' />
        </div>

        {children}
      </section>
    </div>
  );
};
export default layout;
