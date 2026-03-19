import toast from "react-hot-toast";
import { DeleteFileBodyType } from "../types";
import { axiosInstance } from "../config";
import { API_REQ_URL } from "../consts/links";

export async function apiDeleteFile(body: DeleteFileBodyType, boardId: string) {
  try {
    if (!boardId) {
      return toast.error("Board not found");
    }

    const response = await axiosInstance.delete(API_REQ_URL.upload, {
      data: body,
    });

    if (response?.data?.statusCode === 200) {
      return true;
    }
  } catch (error: any) {
    throw error;
  }
}
