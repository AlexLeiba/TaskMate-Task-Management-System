"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export function AddNewListCard() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen ? (
        <div className="flex flex-col justify-between py-2 px-4 bg-gray-500 text-white min-w-62 rounded-sm ">
          <div className="flex justify-between">
            <p>Add new list</p>
            <button
              className="cursor-pointer hover:opacity-80"
              title="Close add new list"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
          </div>
          <Input autoFocus placeholder="List name..." />
        </div>
      ) : (
        <Button
          variant={"ghost"}
          onClick={() => setIsOpen(true)}
          title="Add new list"
          className="flex  cursor-pointer py-2 px-4 bg-gray-500 text-white min-w-62 rounded-md hover:opacity-80"
        >
          <div className="flex gap-2 items-center">
            <Plus className="text-white" size={20} /> <p>Add new list</p>
          </div>
        </Button>
      )}
    </>
  );
}
