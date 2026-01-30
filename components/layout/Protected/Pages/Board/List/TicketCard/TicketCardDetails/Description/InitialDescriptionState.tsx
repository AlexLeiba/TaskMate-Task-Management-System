import { IconButton } from "@/components/ui/iconButton";
import React, { ComponentProps } from "react";

type Props = ComponentProps<typeof IconButton> & {
  children?: React.ReactNode;
};
export function InitialDescriptionState({ children, ...props }: Props) {
  return (
    <IconButton
      {...props}
      className="p-2 h-72.5 w-full hover:bg-gray-800 overflow-y-auto rounded-bl-md rounded-br-md"
    >
      {children}
    </IconButton>
  );
}
