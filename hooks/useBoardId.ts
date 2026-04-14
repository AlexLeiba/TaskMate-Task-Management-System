import { usePathname } from "next/navigation";

/**
 * MUST BE USED ONLY ON BOARD PAGE,
 * Returns the current boardId from the pathname.
 * If the boardId is not present, an empty string is returned.
 * @returns {string} The boardId or an empty string.
 */

export function useBoardId(): string {
  const boardId = usePathname().split("/").at(-1);
  return boardId || "";
}
