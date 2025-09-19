"use client";
import { useState } from "react";
import { TopSection } from "@/app/drivers/components/TopSection";
import { DriverCard } from "@/app/drivers/components/DriverCard";
import { DriversTable } from "@/app/drivers/components/DriversTable";
import { BarCard } from "@/app/drivers/components/BarCard";
import { TreeCard } from "@/app/drivers/components/TreeCard";
import { LineCard } from "@/app/drivers/components/LineCard";
import { ModeToggle } from "@/components/ui/ModeToggle"
import { DropDown } from "@/app/drivers/components/DropDown"
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

      <div className="pb-4 pt-8 md:pt-0">
        <DropDown onYearChange={handleYearChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 justify-items-center">
        <div className="col-span-1 md:col-span-3 w-full">
          <DriversTable year={selectedYear} />
        </div>
        <div className="col-span-1 md:col-span-6 w-full">
          <LineCard year={selectedYear} />
        </div>
        <div className="col-span-1 md:col-span-5 w-full">
          <BarCard year={selectedYear} />
        </div>
        {/* <div className="col-span-1 md:col-span-5 w-full">
          <BarCard2  />
        </div> */}
        <div className="col-span-1 md:col-span-4 w-full">
          <TreeCard year={selectedYear} />
        </div>
      </div>
    </div>
  );
}