 "use client"
import { cn } from '@/lib/utils';
import { icons } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IconType } from 'react-icons';
import qs from 'query-string';

interface CategoryItemProps {
  label: string;
  icon?: IconType;
  value: string;
}

const CategoryItem = ({ label, icon: Icon, value }: CategoryItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParms = useSearchParams();

  

  const CurrentCategorId = searchParms.get('categoryId');
  const currentTitle = searchParms.get('title');


  const isSelected = CurrentCategorId === value;



  const onClick = () => {

    const url = qs.stringifyUrl(
      
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );



    router.push(url);
  };
  // console.log(CurrentCategory, "CurrentCategory");

  return (
    <button
    
      onClick={onClick}
      className={cn(
        'py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition',
        isSelected && 'border-sky-700 bg-sky-200/20 text-sky-800'
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};

export default CategoryItem;