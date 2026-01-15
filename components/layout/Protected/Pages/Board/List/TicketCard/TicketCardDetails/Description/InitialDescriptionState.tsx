import { IconButton } from "@/components/ui/iconButton";
import React, { ComponentProps } from "react";

type Props = ComponentProps<typeof IconButton> & {
  children?: React.ReactNode;
};
export function InitialDescriptionState({ children, ...props }: Props) {
  return (
    <IconButton {...props} className="p-2 h-[201.84px] hover:bg-gray-800">
      {children}
    </IconButton>
  );
}
