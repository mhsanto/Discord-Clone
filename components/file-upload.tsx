"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
type FileUploadProps = {
  endpoint: "serverImage" | "messageFile";
  value: string;
  onChange: (value?: string) => void;
};
export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.error(error);
      }}
    />
  );
};
