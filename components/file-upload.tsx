"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
type FileUploadProps = {
  endpoint: "serverImage" | "messageFile";
  value: string;
  onChange: (value?: string) => void;
};
export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative w-20 h-w-20">
        <Image
          src={value}
          width={80}
          height={80}
          alt="Server Image"
          className="rounded-full aspect-square object-fill"
 
        />

        <button
          onCanPlay={() => onChange("")}
          className="bg-red-500 absolute top-0 right-0  rounded-full z-10"
          type="button"
        >
          <Cross2Icon className="h-4 w-4" />
          <span className="sr-only">Remove</span>
        </button>
      </div>
    );
  }
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
