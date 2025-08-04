"use client"
import { sortTypes } from '@/app/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, usePathname } from 'next/navigation';

const Sort = () => {
  const path = usePathname();
  const router = useRouter();


  const handleSort = (value : string) => {
      router.push(`${path}?sort=${value}`);
  }

  return (
    <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
      <SelectTrigger className='sort-select'>
        <SelectValue placeholder={sortTypes[0].value} />
      </SelectTrigger>
      <SelectContent className='sort-select-content'>
        {sortTypes.map((sort) => (
          <SelectItem
            key={sort.label}
            className='shad-select-item'
            value={sort.value}
          >
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default Sort;
