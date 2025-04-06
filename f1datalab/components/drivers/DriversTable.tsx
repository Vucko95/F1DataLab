"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { nationalityToFlag } from "@/lib/utils";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { fetchDriverStandingsYear } from "@/app/services/api";
import Image from "next/image";

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

export function DriversTable({ year }: DriversTableProps) {

  const [drivers, setDrivers] = useState<DriverStanding[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: DriverStanding[] = await fetchDriverStandingsYear(year);
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching driver standings:", error);
      }
    };
    fetchData();
  }, [year]);

  const totalPages = Math.ceil(drivers.length / itemsPerPage);
  const paginatedDrivers = drivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
  <Card className="p-4 h-full flex flex-col">
      <Table className="text-sm 2xl:text-base 4k:text-lg">
        <TableHeader>
          <TableRow>
            {/* TODO ! INSTEAD DRIVER ID ADD DRIVER CURRENT PLACMENT IN STANDINGS 1,2,3...4.5 ""*/}
            {/* TODO ! "MAYBE" DRIVERS LOGO INSTEAD ID */}
            {/* <TableHead className="text-center text-sm 2xl:text-base 4k:text-lg">Driver ID</TableHead> */}
            <TableHead className="text-center text-sm 2xl:text-base 4k:text-lg">Nat</TableHead>
            <TableHead className="text-center text-sm 2xl:text-base 4k:text-lg">Driver</TableHead>
            <TableHead className="text-center text-sm 2xl:text-base 4k:text-lg">C</TableHead>
            <TableHead className="text-center text-sm 2xl:text-base 4k:text-lg">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedDrivers.map((driver) => {
            const nationalityFlag = nationalityToFlag[driver.nationality] || "us";
            return (
              <TableRow key={driver.driverId} className="text-center text-sm 2xl:text-base 4k:text-lg">
                  <TableCell >
                  <Image src={`https://flagcdn.com/${nationalityFlag}.svg`} alt={`${driver.nationality} Flag`} width={18} height={18} />
                  </TableCell>
                <TableCell>{driver.forename} {driver.surname}</TableCell>
                  <TableCell >
                  <Image src={`/images/constructors/${driver.constructorId}.webp`} alt="Constructor Logo" width={25} height={25} />
                    </TableCell>
                <TableCell>{driver.total_points}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

  
      <div className="flex justify-between w-full pt-4 ">
        <Button 
          className="bg-sidebar text-foreground border-gray-600 hover:bg-gray-700"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>
          Prev
        </Button>

        <Button
          className="bg-sidebar text-foreground border-gray-600 hover:bg-gray-700"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>

  </Card>
  ); }

