"use client";
import { useState } from "react";
// import { TopSection } from "@/components/races/TopSection";
// import { DriverCard } from "@/components/races/RaceTable";

import { RaceTable } from "@/app/races/components/RaceTable";
import { BarGridPositionCard } from "@/components/abandoned/BarGridPositionCard";
// import { RaceCard } from "@/components/races/RaceTableCard";
import { BarCard } from "@/components/abandoned/BarCard";
// import { TreeCard } from "@/components/constructors/TreeCard";
import { LineCardGainedLostPositionRace } from "@/components/abandoned/LineCardGainedLostPositionRace";
import { PitStops } from "@/app/races/components/PitStops";
import { TreeCardConstructorsRace } from "@/app/races/components/TreeCardConstructorsRace";
import { RaceCircuitInfo } from "@/app/races/components/RaceCircuitInfo";
import { RacePaceCardHC } from "@/app/races/components/RacePaceCardHC";
import { ModeToggle } from "@/components/ui/ModeToggle"
import { DropDown } from "@/app/races/components/DropDown"
import { DropDownRace } from "@/app/races/components/DropDownRace"
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

        <div className="col-span-4 w-full">
        <PitStops raceId={selectedRace} />
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