import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface SidbarProps {
    icon: LucideIcon;
    Label: string;
    href: string;
}

const SidbarItem = ({ icon: Icon, href, Label }: SidbarProps) => {
    const pathname = usePathname();
  

    const isActive = 
        (pathname === "/" && href === "/") || 
        pathname === href || 
        pathname.startsWith(`${href}/`);



    const router = useRouter();

    const onClick = () => {
        router.push(href);
    };

    return (
        <button 
            onClick={onClick}
            className={cn(
                "mb-2 flex items-center gap-x-2 text-slate-500 font-[500] pl-6 translate-all hover:text-sky-600 hover:bg-sky-300/20 w-full", 
                isActive && "text-sky-700 bg-sky-200/20 hover:text-sky-300/20 "
            )}
        >
            <div className='flex items-center gap-x-2 py-4' >
                {Icon && (
                    <Icon 
                        size={20}   
                        className={cn(
                            "text-slate-500",
                            isActive && "text-slate-700"
                        )} 
                    />
                )}
           {Label}
            </div>
           

            <div
            className={cn(
                "ml-auto border-2  border-sky-700 h-full opacity-0 ",
                isActive && "opacity-900 h-6" 
               
  



            )}

            ></div>
        </button>
    );
};

export default SidbarItem;
