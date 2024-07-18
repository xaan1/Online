

"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

type Props = {

  value: string;
};



const Preview: React.FC<Props> = ({  value }) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
      }),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill theme="bubble" value={value}
      readOnly
      
      />
    </div>
  );
};

export default Preview;
