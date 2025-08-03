
import { toast } from "sonner";


const ToastMessage = ({ fileName, type }: { fileName: string, type: string }) => {
  
  console.log('type', type, fileName);
  alert('toast')
  

  return (
    toast.custom((t) => (
         <div onClick={() => toast.dismiss(t)}>
           <p className='body-1 rounded-xl bg-brand px-4 py-2 text-white'>
             <span className='font-semibold'>{fileName}</span> {type} successfully
           </p>
         </div>
       ))
  )
}
export default ToastMessage