"use client";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchDriverStandingsYear } from "@/app/services/api";

interface DriversTableProps {
  year: number;
}

interface DriverStanding {
  driverId: number;
  raceId: number;
  constructorId: number;
  forename: string;
  surname: string;
  nationality: string;
  total_points: number;
}

const nationalityToFlag: { [key: string]: string } = {
  British: "gb",
  Dutch: "nl",
  German: "de",
  Monegasque: "mc",
  Finnish: "fi",
  Australian: "au",
  Mexican: "mx",
  UnitedStates: "us",
  French: "fr",
  Spanish: "es",
  Canadian: "ca",
  Polish: "pl",
  Japanese: "jp",
  Thai: "th",
  Danish: "dk",
  Chinese: "cn",
  "New Zealander": "nz",
};

export function DriversTable({ year }: DriversTableProps) {
  const [drivers, setDrivers] = useState<DriverStanding[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: DriverStanding[] = await fetchDriverStandingsYear(year);
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching driver standings:", error);
      }
    };
    // ADDING Mount due the hydration erros , which happens due the missmatch on server and client sidde.
    if (isMounted) {
      fetchData(); // fetch  data only after the component has mounted.
    }
  }, [year, isMounted]); // re-fetch data whenever year changes

  if (!isMounted) {
    return null; // render nothing on the server
  }

  return (
    <Table>
      <ScrollArea className="h-[40vh] w-[73vh] "  type="always">
      {/* TODO ! FIX DEFAULT SCROLLBAR TO BE CHANGED WITH SHADCN/UI THEME ONE */}
        
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Driver ID</TableHead>
            <TableHead className="text-center">Nationality</TableHead>
            <TableHead className="text-center">Forename</TableHead>
            <TableHead className="text-center">Surname</TableHead>
            <TableHead className="text-center">Constructor</TableHead>
            <TableHead className="text-center">Total Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.map((driver) => {
            const nationalityFlag = nationalityToFlag[driver.nationality] || "us";
            return (
              <TableRow key={driver.driverId} className="text-center">
                <TableCell>
                  {driver.driverId}
                  {/* TODO ! "MAYBE" DRIVERS LOGO INSTEAD ID */}
                {/* <Image
                    src={`/images/drivers/${driver.driverId}.webp`}
                    alt="Driver Logo"
                    width={30}
                    height={30}
                    className="rounded-xl"
                  /> */}
                </TableCell>
                {/* TODO ! ISSUE WITH IMAGE BEING A BIT PUSHED DOWN WHEN USING FLEX JUSTIFY-CENTER */}
                {/* <TableCell className="flex justify-center "> */}
                <TableCell className="align-center pl-12 ">
                  <Image
                    src={`https://flagcdn.com/${nationalityFlag}.svg`}
                    alt={`${driver.nationality} Flag`}
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                </TableCell>
                <TableCell>{driver.forename}</TableCell>
                <TableCell>{driver.surname}</TableCell>
                <TableCell className="flex justify-center">
                  <Image
                    src={`/images/constructors/${driver.constructorId}.webp`}
                    alt="Constructor Logo"
                    width={25}
                    height={25}
                    className="rounded-sm"
                    />
                </TableCell>
                <TableCell>{driver.total_points}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </ScrollArea>
    </Table>
  );
}
