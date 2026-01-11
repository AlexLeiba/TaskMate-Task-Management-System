import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col h-screen gap-2">
      <h2 className="text-5xl">Not Found</h2>
      <p className="text-2xl">Could not find requested resource</p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
