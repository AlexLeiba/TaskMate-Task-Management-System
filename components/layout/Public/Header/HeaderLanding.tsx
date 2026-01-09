import { Logo } from "../../Logo/Logo";
import Links from "../Links";

export function HeaderLanding() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-400 z-50">
      <div className="max-w-4xl px-4 py-2 mx-auto">
        <div className="flex justify-between">
          <Logo />

          <Links />
        </div>
      </div>
    </header>
  );
}
