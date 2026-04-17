"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const CreateNewNotificationDialog = dynamic(() =>
  import("./CreateNewNotificationDialog").then(
    (m) => m.CreateNewNotificationDialog,
  ),
);

export function AdminNotifications() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => setIsModalOpen(true)}>
          Add new notification
        </Button>
      </div>

      {isModalOpen && (
        <CreateNewNotificationDialog
          setCloseQuill={() => setIsModalOpen(false)}
          isQuillVisible={isModalOpen}
        />
      )}
    </>
  );
}
