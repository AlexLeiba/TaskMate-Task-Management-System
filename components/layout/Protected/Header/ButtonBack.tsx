import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export function ButtonBack() {
  return (
    <Link
      href="/dashboard"
      title="Go back to dashboard"
      aria-label="Go back to dashboard"
    >
      <Button className="md:hidden" variant={"ghost"}>
        <ChevronLeft />
      </Button>
    </Link>
  );
}
