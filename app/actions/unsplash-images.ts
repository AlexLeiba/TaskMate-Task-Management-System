"use server";

import { UnsplashImagesType } from "@/lib/types";
import { createApi } from "unsplash-js";

const serverApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
  //...other fetch options
});

export async function getUnsplashImagesAction(): Promise<{
  data: UnsplashImagesType[] | undefined;
}> {
  try {
    const result = await serverApi.photos.getRandom({
      collectionIds: ["317099"],
      count: 10,
    });

    if (!Array.isArray(result.response)) {
      throw new Error("Something went wrong");
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

    return { data: splashImagesData };
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}
