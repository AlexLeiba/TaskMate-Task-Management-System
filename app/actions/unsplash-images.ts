"use server";

import { UnsplashImagesType } from "@/lib/types";
import { createApi } from "unsplash-js";

const serverApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
  //...other fetch options
});

export async function getUnsplashImagesAction(): Promise<{
  data: UnsplashImagesType[] | undefined;
  error: {
    message: string;
  };
}> {
  const result = await serverApi.photos.getRandom({
    collectionIds: ["317099"],
    count: 10,
  });

  if (result.errors) {
    return {
      data: undefined,
      error: { message: result.errors[0] },
    };
  }
  if (!Array.isArray(result.response)) {
    return { data: undefined, error: { message: "Invalid response" } };
  }

  const splashImagesData: UnsplashImagesType[] = result.response?.map(
    (data) => {
      return {
        id: data.id,
        urls: {
          small: data.urls.small,
          regular: data.urls.regular,
          full: data.urls.full,
        },
        title: data.user.location || "Unknown",
      };
    },
  );

  return { data: splashImagesData, error: { message: "" } };
}
