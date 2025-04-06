"use client";
import { useState } from "react";
// import { TopSection } from "@/components/races/TopSection";
// import { DriverCard } from "@/components/races/RaceTable";

import { RaceTable } from "@/components/races/RaceTable";
import { BarGridPositionCard } from "@/components/races/BarGridPositionCard";
// import { RaceCard } from "@/components/races/RaceTableCard";
import { BarCard } from "@/components/races/BarCard";
// import { TreeCard } from "@/components/constructors/TreeCard";
import { LineCard } from "@/components/races/LineCard";
import { RacePaceCard } from "@/components/races/RacePaceCard";
import { RacePaceCardHC } from "@/components/races/RacePaceCardHC";
import { ModeToggle } from "@/components/ui/ModeToggle"
import { DropDown } from "@/components/races/DropDown"
import { DropDownRace } from "@/components/races/DropDownRace"
// import { Card, CardContent } from "@/components/ui/card";




export default function RacesPage() {
  // TODO ! ALSO ON ONLY YEAR CHANGE PUSH CHANGES TO TABLE 
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedRace, setSelectedRace] = useState<number>(1121);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleRaceChange = (raceId: number) => {
    setSelectedRace(raceId);
  };

  return (

    <div className="p-4 pl-8">
      <ModeToggle />
      <div className="pb-4 pt-0 flex gap-x-4">
        <DropDown onYearChange={handleYearChange} />
        <DropDownRace year={selectedYear} onRaceChange={handleRaceChange} />
      </div>
      <div className="grid grid-cols-10 gap-4 justify-items-center">

        <div className="col-span-4 w-full">
          {/* TODO MAYBE ADD QUALY POSITION AND RACE GAINS */}
        <RaceTable raceId={selectedRace} />
        </div>
        <div className="col-span-6 w-full">
        <BarGridPositionCard  raceId={selectedRace} />
        </div>
        <div className="col-span-5 w-full">
        <LineCard year={selectedYear} />
        </div>
        <div className="col-span-5 w-full">
        <BarCard year={selectedYear} raceId={selectedRace} />
        </div>

        </div>
      </div>


  );
}

      {/* <RaceCard  raceId={selectedRace} /> */}
      {/* <RaceTable raceId={selectedRace} /> */}
      {/* <RacePaceCard  raceId={selectedRace} /> */}
      {/* <RacePaceCardHC /> */}

      {/* <TreeCard year={selectedYear} />  */}
      {/* <PieCard  /> */}