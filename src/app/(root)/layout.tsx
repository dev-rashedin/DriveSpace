import React from "react"


const layout = ({children} : {children: React.ReactNode}) => {
  return (
    <main className='flex h-screen'>
      {/* sidebar */}
      Sidebar
      <section className='flex h-full flex-1 flex-col'>
        MobileNavigation Header
        <div className='main-content'>{children}</div>
      </section>
    </main>
  );
}
export default layout