import { usePathname } from "next/navigation";

export function useBoardId(): string {
  const boardId = usePathname().split("/").at(-1);
  return boardId || "";
}
