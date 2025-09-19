"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { fetchRaceDetails } from "@/app/services/api";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { nationalityToFlag } from "@/lib/utils";
import Image from "next/image";

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
  grid: number;
  time: string | null;
}

export function RaceTable({ raceId }: RaceIdProps) {
  const [drivers, setRaceResults] = useState<RaceResults[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: RaceResults[] = await fetchRaceDetails(raceId);
        setRaceResults(data);
      } catch (error) {
        console.error("Error fetching race results:", error);
      }
    };
    fetchData();
  }, [raceId]);

  const totalPages = Math.ceil(drivers.length / itemsPerPage);
  const paginatedDrivers = drivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="h-full">
      <CardContent className="h-full flex flex-col justify-between">
        <Table>
          <TableHeader>
  <TableRow>
    <TableHead className="text-center">Pos</TableHead>
    <TableHead className="text-center">N</TableHead>
    <TableHead className="text-center">Driver</TableHead>
    <TableHead className="text-center hidden sm:table-cell">Change</TableHead>
    <TableHead className="text-center hidden md:table-cell">Constructor</TableHead> 
    <TableHead className="text-center hidden md:table-cell">Time</TableHead>
  </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDrivers.map((driver) => {
              const nationalityFlag = nationalityToFlag[driver.nationality] || "us";
              const positionChange = driver.grid - driver.position;
              let positionChangeText: string;
              let positionChangeColorClass: string;

              if (positionChange > 0) {
                positionChangeText = `+${positionChange}`;
                positionChangeColorClass = 'text-green-500';
              } else if (positionChange < 0) {
                positionChangeText = `${positionChange}`;
                positionChangeColorClass = 'text-red-500';
              } else {
                positionChangeText = 'N';
                positionChangeColorClass = 'text-gray-500';
              }

              return (
                <TableRow key={driver.driverId} className="text-center">
                  <TableCell>{driver.position}</TableCell>
                  <TableCell>
                    <Image src={`https://flagcdn.com/${nationalityFlag}.svg`} alt={`${driver.nationality} Flag`} width={20} height={20} className="rounded-sm" />
                  </TableCell>
                  <TableCell>{driver.forename} {driver.surname}</TableCell>
                  <TableCell className={`${positionChangeColorClass} hidden sm:table-cell`}>
                      {positionChangeText}
                    </TableCell>
                  <TableCell className="flex justify-center hidden md:table-cell">
                    <Image src={`/images/constructors/${driver.constructorId}.webp`} alt="Constructor Logo" width={25} height={25} className="rounded-sm" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{driver.time || 'N/A'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex justify-between w-full pt-4 ">
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
      </CardContent>
    </Card>
  );
}
