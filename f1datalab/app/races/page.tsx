"use client";
import { useState } from "react";
// import { TopSection } from "@/components/races/TopSection";
// import { DriverCard } from "@/components/races/RaceTable";

import { RaceTable } from "@/components/races/RaceTable";
import { BarGridPositionCard } from "@/components/abandoned/BarGridPositionCard";
// import { RaceCard } from "@/components/races/RaceTableCard";
import { BarCard } from "@/components/abandoned/BarCard";
// import { TreeCard } from "@/components/constructors/TreeCard";
import { LineCardGainedLostPositionRace } from "@/components/abandoned/LineCardGainedLostPositionRace";
import { TreeCardConstructorsRace } from "@/components/races/TreeCardConstructorsRace";
import { RaceCircuitInfo } from "@/components/races/RaceCircuitInfo";
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

  {/* TODO MAYBE ADD QUALY POSITION AND RACE GAINS, (how much a driver gained from starting position until the finish line) */}
  {/* TODO RACE PACE CARD - RACE EVOLUTION by LAP CARD */}
  return (

    <div className="p-4 pl-8">
      <ModeToggle />
      <div className="pb-4 pt-0 flex gap-x-4">
        <DropDown onYearChange={handleYearChange} />
        <DropDownRace year={selectedYear} onRaceChange={handleRaceChange} />
      </div>

      <div className="grid grid-cols-10 gap-4 justify-items-center">

        <div className="col-span-3 w-full">
        <RaceCircuitInfo raceId={selectedRace} />
        </div>

        <div className="col-span-3 w-full">
        <RaceTable raceId={selectedRace} />
        </div>

        <div className="col-span-4 w-full">
        <TreeCardConstructorsRace raceId={selectedRace} />
        </div>


        <div className="col-span-6 w-full">
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