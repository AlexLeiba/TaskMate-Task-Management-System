import { UnsplashImagesType } from "../../types";

export const FILES_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.text",
  "text/plain",
  "text/html",
  "text/css",
  "text/javascript",
] as const;

export const IMAGES_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/jpg",
] as const;

export const UNSPLASH_DEFAULT_IMAGES: UnsplashImagesType[] = [
  {
    id: "NIyqowE5aDE",
    urls: {
      small:
        "https://images.unsplash.com/photo-1519268237282-0d15e6791ccc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1519268237282-0d15e6791ccc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1519268237282-0d15e6791ccc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "California",
  },
  {
    id: "hwhhfsFgu8M",
    urls: {
      small:
        "https://images.unsplash.com/photo-1524880789177-baf31d6afd94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1524880789177-baf31d6afd94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1524880789177-baf31d6afd94?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "Baltimore",
  },
  {
    id: "fg_FSTo7ejw",
    urls: {
      small:
        "https://images.unsplash.com/photo-1520634996521-d0985c84316a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1520634996521-d0985c84316a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1520634996521-d0985c84316a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "Orlando, FL",
  },
  {
    id: "5D-5BHyNLt0",
    urls: {
      small:
        "https://images.unsplash.com/photo-1538425679099-774ec988c02a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1538425679099-774ec988c02a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1538425679099-774ec988c02a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "Brescia (Italy)",
  },
  {
    id: "WJyCRU1m7h8",
    urls: {
      small:
        "https://images.unsplash.com/photo-1569261995036-70d0dd50be24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1569261995036-70d0dd50be24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1569261995036-70d0dd50be24?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "Poland",
  },
  {
    id: "W9OKrxBqiZA",
    urls: {
      small:
        "https://images.unsplash.com/photo-1497888329096-51c27beff665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1497888329096-51c27beff665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1497888329096-51c27beff665?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "SLC, UT",
  },
  {
    id: "iCoKBp2bZEU",
    urls: {
      small:
        "https://images.unsplash.com/photo-1555883006-0f5a0915a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1555883006-0f5a0915a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1555883006-0f5a0915a80f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "California",
  },
  {
    id: "MHua8zOLanw",
    urls: {
      small:
        "https://images.unsplash.com/photo-1563117267-f732cd912858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1563117267-f732cd912858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1563117267-f732cd912858?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "Salzburg / Austria",
  },
  {
    id: "bKOG83eQNu8",
    urls: {
      small:
        "https://images.unsplash.com/photo-1593052583071-d5c8bb438720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1593052583071-d5c8bb438720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1593052583071-d5c8bb438720?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "Tennessee",
  },
  {
    id: "RJaRebG0a30",
    urls: {
      small:
        "https://images.unsplash.com/photo-1547914495-276897ecb8d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=400",
      regular:
        "https://images.unsplash.com/photo-1547914495-276897ecb8d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=80&w=1080",
      full: "https://images.unsplash.com/photo-1547914495-276897ecb8d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjEzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjkxMTY4MzR8&ixlib=rb-4.1.0&q=85",
    },
    title: "Santorini, Greece",
  },
];
