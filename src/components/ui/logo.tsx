import Image from "next/image"


const Logo = ({ type } : {type: 'mobile' | 'desktop'}) => {
  return (
    <div className='flex items-center gap-3'>
      <Image
        src='/logo.png'
        alt='logo'
        width={type === 'mobile' ? 50 : 60}
        height={type === 'mobile' ? 50 : 60}
        className='h-auto'
      />
      <h1 className='text-4xl font-semibold text-brown lg:text-5xl '>
        DriveSpace
      </h1>
    </div>
  );
}
export default Logo