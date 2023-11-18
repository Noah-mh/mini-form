import React from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";

import { X } from "lucide-react";
import Image from "next/image";


type FileUploadProps = {
    onChange: (url?: string) => void;
    value?: string;
    endpoint: "imageUpload";
}

export const FileUpload: React.FC<FileUploadProps> = ({ endpoint, value, onChange }) => {
    const fileType = value?.split(".").pop();
    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image
                    src={value}
                    alt="Upload"
                    className="rounded-full object-cover w-auto h-auto"
                    width={600}
                    height={600}
                />
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0]?.url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }} />
    );
}