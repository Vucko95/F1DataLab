"use client";
import { useState } from "react";
import { TopSection } from "@/components/drivers/TopSection";
import { DriverCard } from "@/components/drivers/DriverCard";
import { DriversTable } from "@/components/drivers/DriversTable";
import { BarCard } from "@/components/drivers/BarCard";
import { TreeCard } from "@/components/drivers/TreeCard";
import { LineCard } from "@/components/drivers/LineCard";
import { ModeToggle } from "@/components/ui/ModeToggle"
import { DropDown } from "@/components/drivers/DropDown"
import { ModeCoffe } from "@/components/ui/ModeCoffe";



export default function DriversPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (

    <div className="p-4 pl-8">
      <ModeCoffe />
      <ModeToggle />

      <div className="pb-4 pt-0">
        <DropDown onYearChange={handleYearChange} />
      </div>

      <div className="grid grid-cols-10 gap-4 justify-items-center">

        <div className="col-span-3 w-full">
          <DriversTable year={selectedYear} />
        </div>

        <div className="col-span-7 w-full">
          <LineCard year={selectedYear} />
        </div>

        <div className="col-span-5 w-full">
          <BarCard year={selectedYear} />
        </div>

        <div className="col-span-5 w-full">
          <TreeCard year={selectedYear} />
        </div>
      </div>
    </div>
  );
}