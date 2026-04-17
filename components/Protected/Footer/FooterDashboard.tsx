import { Logo } from "../../Shared/Logo";
import { SocialMediaLinks } from "../../Shared/SocialMediaLinks";

export function FooterDashboard() {
  return (
    <footer
      className="p-4 bg-background-element text-white w-full"
      data-test="footer"
    >
      <div className="max-w-350 pl-4 mx-auto">
        <div className="flex justify-between items-center">
          <Logo visible />
          <SocialMediaLinks />
        </div>
      </div>
    </footer>
  );
}
