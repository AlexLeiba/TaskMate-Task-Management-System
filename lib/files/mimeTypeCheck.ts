import { FILES_MIME_TYPES, IMAGES_MIME_TYPES } from "../consts/protected/files";
import { FileMimeType, ImageMimeType } from "../types";

export function isFileMimeType(type: string): type is FileMimeType {
  return FILES_MIME_TYPES.includes(type as FileMimeType);
}

export function isImageMimeType(type: string): type is ImageMimeType {
  return IMAGES_MIME_TYPES.includes(type as ImageMimeType);
}
