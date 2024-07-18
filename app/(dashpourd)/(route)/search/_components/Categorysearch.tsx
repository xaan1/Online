 "use client"
import React from 'react';
import { Category } from '@prisma/client';
import { IconType } from 'react-icons';
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from 'react-icons/fc';
import CategoryItem from './CategoryItem';

interface CategoryProps {
  items: Category[];
}

const iconMap: Record<string, IconType> = {
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Fitness": FcSportsMode,
  "Accounting": FcSalesPerformance,
  'Computer Science': FcMultipleDevices,
   "Filming": FcFilmReel,
  "Engineering": FcEngineering,
};

const Categorysearch = ({ items }: CategoryProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (

        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}

    </div>
  );
};

export default Categorysearch;