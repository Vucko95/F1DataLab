"use client";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchRaceDetails } from "@/app/services/api";

interface RaceIdProps {
  raceId: number;
}


interface RaceResults {
  driverId: number;
  raceId: number;
  constructorId: number;
  forename: string;
  surname: string;
  nationality: string;
  position: number;
  time: string
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

export function RaceTable({ raceId }: RaceIdProps) {
  const [drivers, setRaceResults] = useState<RaceResults[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: RaceResults[] = await fetchRaceDetails(raceId);
        setRaceResults(data);
        console.log(raceId);
      } catch (error) {
        console.error("Error fetching driver standings:", error);
      }
    };
    if (isMounted) {
      fetchData();
    }
  }, [raceId, isMounted]);

  if (!isMounted) {
    return null;
  }

  const totalPages = Math.ceil(drivers.length / itemsPerPage);
  const paginatedDrivers = drivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Position</TableHead>
            <TableHead className="text-center">Nationality</TableHead>
            <TableHead className="text-center">Forename</TableHead>
            <TableHead className="text-center">Surname</TableHead>
            <TableHead className="text-center">Constructor</TableHead>
            <TableHead className="text-center">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedDrivers.map((driver) => {
            const nationalityFlag = nationalityToFlag[driver.nationality] || "us";
            return (
              <TableRow key={driver.driverId} className="text-center">
                <TableCell>{driver.position}</TableCell>
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
                  <Image src={`/images/constructors/${driver.constructorId}.webp`} alt="Constructor Logo" width={25} height={25} className="rounded-sm" />
                </TableCell>
                <TableCell>{driver.time}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="flex justify-between w-full ">
        <Button
          className="bg-sidebar text-foreground border-gray-600 hover:bg-gray-700"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>Prev
        </Button>

        <Button
          className="bg-sidebar text-foreground border-gray-600 hover:bg-gray-700"

          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}>Next
        </Button>
      </div>
    </div>
  );
}

