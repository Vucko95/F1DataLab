"use client";
import { useState } from "react";
import { ConstructorsTable } from "@/app/constructors/components/ConstructorsTable";
import { BarCard } from "@/app/constructors/components/BarCard";
import { TreeCard } from "@/app/constructors/components/TreeCard";
import { LineCard } from "@/app/constructors/components/LineCard";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { ModeCoffe } from "@/components/ui/ModeCoffe";
import { DropDown } from "@/app/drivers/components/DropDown";

export default function ConstructorsPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };
// TODO ! FIX CONSTRUCTOR GRAPH TITLES
  return (
    <div className="p-4 pl-8">
      <ModeCoffe />
      <ModeToggle />

      <div className="pb-4 pt-0">
        <DropDown onYearChange={handleYearChange} />
      </div>

      <div className="grid grid-cols-10 gap-4 justify-items-center">

        <div className="col-span-3 w-full">
          <ConstructorsTable year={selectedYear} />
        </div>

        <div className="col-span-6 w-full">
          <LineCard year={selectedYear} />
        </div>

        <div className="col-span-5 w-full">
          <BarCard year={selectedYear} />
        </div>

        <div className="col-span-4 w-full">
          <TreeCard year={selectedYear} />
        </div>
      </div>
    </div>
  );
}
