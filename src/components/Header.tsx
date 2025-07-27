import Image from "next/image"
import { Button } from "./ui/button"
import Search from "./Search"
import FileUploader from "./FileUploader"

const Header = () => {
  return (
    <header className="header">
     <Search/>

      <div className="header-wrapper">
    <FileUploader/>

        <form>
          <Button type='submit' className="sign-out-button">
            <Image src='/assets/icons/logout.svg' alt='sign out' height={20} width={20} />
          </Button>
        </form>
      </div>
    </header>
  )
}
export default Header