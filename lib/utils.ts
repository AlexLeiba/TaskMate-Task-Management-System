import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import JSZip from "jszip";
import { saveAs } from "file-saver";

export type DownloadZipTypeProps = {
  files: {
    name: string;
    url: string;
  }[];
  zipName?: string;
};
export const downloadAsZip = async ({
  files,
  zipName = "files.zip",
}: DownloadZipTypeProps) => {
  const zip = new JSZip();

  for (const item of files) {
    console.log("🚀 ~ downloadAsZip ~ item:", item);
    if (!item.url) return;
    // Fetch file from URL
    const response = await fetch(item.url);
    const blob = await response.blob();
    zip.file(item.name, blob);
  }

  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  saveAs(zipBlob, zipName);
};
