import Image from "next/image";
import Link from "next/link"
import Logo from "./ui/logo";


const Sidebar = () => {
  return (
    <aside className='sidebar'>
      {/* logo for sidebar */}   
        <Logo type='sidebar' />

    </aside>
  );
}
export default Sidebar