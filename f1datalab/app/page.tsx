import Image from "next/image";
import { ModeToggle } from "@/components/ui/ModeToggle"
import { Button } from "@/components/ui/button"
import { TableDemo } from "@/components/structure/table"

export default function Home() {
  return (
    <div>
      <ModeToggle />
      <TableDemo />

    </div>
  );
}
