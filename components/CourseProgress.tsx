import React from "react";

import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface Props  {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
};

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

const CourseProgress = ({ value, variant, size } : Props) => {
  return (
  <div>
     <Progress className="h-1 bg-red-100"  variant={variant} value={value}/>
     <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}>
        {Math.round(value)}% Complete
      </p>
  </div>
  );
};

export default CourseProgress;