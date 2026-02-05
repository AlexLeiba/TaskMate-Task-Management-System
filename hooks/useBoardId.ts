import { usePathname } from "next/navigation";

export function useBoardId() {
  const boardId = usePathname().split("/").at(-1);
  return boardId || "";
}
