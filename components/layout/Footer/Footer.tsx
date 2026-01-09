import React from "react";
import Links from "../Links";

export function Footer() {
  return (
    <footer className="p-4 bg-gray-600 text-white ">
      <div className="max-w-4xl pl-4 mx-auto">
        <div className="flex justify-between">
          Footer <Links />
        </div>
      </div>
    </footer>
  );
}
