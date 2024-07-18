import React from 'react';
import { UploadDropzone } from '@/lib/uploadthing';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import toast from 'react-hot-toast';

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}




const FileUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {
  return (


    <UploadDropzone
      endpoint={endpoint}

      onClientUploadComplete={(res) => {
        console.log('Upload Complete:', res);
        onChange(res?.[0].url);
        console.log("File uploaded successfully:", res[0].url);
      }}
      onUploadError={(err) => {
        console.log('Upload Error xaaan:', err);
        toast.error("Error occurred during file upload ");
      }}
    />
  );
};

export default FileUpload;
