 "use client"
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import qs from "query-string"

const SeacrInbut = () => {

  const [value, setValue] = useState("");

  const debounce =  useDebounce(value)

  const SearchParms = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()


  const currentCategoryId = SearchParms.get("categoryId")




  useEffect(()  =>{

    const  url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debounce,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url)
  },[debounce , router, pathname, currentCategoryId])





  return (
    <div className='relative'>
      <Search className='absolute h-4 w-4  top-3 right-3  text-gray-500 ' />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder="Search for a course"
        className="w-full md:w-[300px] rounded-full pl-9 bg-slate-100 focus-visible:ring-slate-200"
      />
    </div>
  )
}

export default SeacrInbut