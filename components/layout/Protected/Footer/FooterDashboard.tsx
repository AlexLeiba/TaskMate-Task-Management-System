import { Logo } from "../../Logo/Logo";
import Links from "../Links";

export function FooterDashboard() {
  return (
    <footer className="p-4 bg-gray-600 text-white w-full">
      <div className="max-w-350 pl-4 mx-auto">
        <div className="flex justify-between">
          <Logo /> <Links />
        </div>
      </div>
    </footer>
  );
}
