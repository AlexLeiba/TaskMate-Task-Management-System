import React from "react";
import { Logo } from "../Logo/Logo";
import Links from "../Links";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-400 ">
      <div className="max-w-4xl px-4 py-2 mx-auto">
        <div className="flex justify-between">
          <Logo />

          <Links />
        </div>
      </div>
    </header>
  );
}
