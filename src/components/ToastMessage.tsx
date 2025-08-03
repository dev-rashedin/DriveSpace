import { toast } from 'sonner';

/**
 * Custom toast function.
 * @param fileName - The name of the file or entity.
 * @param type - The action type (e.g., "uploaded", "deleted").
 */
export const showToast = (fileName: string, type: string) => {
  toast.custom((t) => (
    <div onClick={() => toast.dismiss(t)} className='cursor-pointer'>
      <p className='body-1 rounded-xl bg-brand px-4 py-2 text-white shadow-md'>
        <span className='font-semibold'>{fileName}</span> {type}d successfully
      </p>
    </div>
  ));
};
