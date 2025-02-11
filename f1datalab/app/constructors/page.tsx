"use client";
import { useState } from "react";
import { TopSection } from "@/components/drivers/TopSection";
import { DriverCard } from "@/components/drivers/DriverCard";
import { TableCard } from "@/components/constructors/TableCard";
import { BarCard } from "@/components/constructors/BarCard";
import { TreeCard } from "@/components/constructors/TreeCard";
import { LineCard } from "@/components/constructors/LineCard";
import { ModeToggle } from "@/components/ui/ModeToggle"
import { DropDown } from "@/components/drivers/DropDown"




export default function ConstructorsPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (

    <div className="p-4 pl-8">
      <ModeToggle />
      <div className="pb-4 pt-0">
        <DropDown onYearChange={handleYearChange} />
      </div>
      {/* <TopSection /> PICK YEAR BUTTOn */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-items-center">

        <TableCard year={selectedYear} />
        <LineCard year={selectedYear} />
        <BarCard year={selectedYear} />
       
        <TreeCard year={selectedYear} /> 
        {/* <PieCard  /> */}

      </div>
    </div>
  );
}