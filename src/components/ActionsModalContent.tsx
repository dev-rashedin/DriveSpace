import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";


const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div className="file-details-thumbnail">
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div className="flex flex-col">
      <p>{file.name}</p>
    </div>
  </div>
)

export const FileDetails = ({file} : {file: Models.Document}) => {
  return <>
  <ImageThumbnail file={file} />  
  </>
}
