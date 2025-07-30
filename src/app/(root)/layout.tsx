import React from 'react';
import MobileNavigation from '@/components/MobileNavigation';
import Sidebar from '@/components/Sidebar';
import Header from './../../components/Header';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';

export const dynamic = 'force-dynamic';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect('/sign-in');

  // console.log('the logged in user: ', currentUser);

  return (
    <main className='flex h-screen'>
      {/* sidebar */}
      <Sidebar {...currentUser} />
      <section className='flex h-full flex-1 flex-col'>
        <MobileNavigation {...currentUser} />
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />
        <div className='main-content'>{children}</div>
      </section>
      <Toaster/>
    </main>
  );
};
export default layout;
