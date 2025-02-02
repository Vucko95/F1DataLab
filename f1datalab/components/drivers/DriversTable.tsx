"use client";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchDriverStandingsYear } from "@/app/services/api"

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
      <ScrollArea className="h-[40vh] rounded-md  p-4">
        <TableHeader>
          <TableRow>
            <TableHead>Driver ID</TableHead>
            <TableHead>Forename</TableHead>
            <TableHead>Surname</TableHead>
            <TableHead>Nationality</TableHead>
            <TableHead>Total Points</TableHead>
            <TableHead>Race ID</TableHead>
            <TableHead>Constructor ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {drivers.map((driver) => (
            <TableRow key={driver.driverId}>
              <TableCell>{driver.driverId}</TableCell>
              <TableCell>{driver.forename}</TableCell>
              <TableCell>{driver.surname}</TableCell>
              <TableCell>{driver.nationality}</TableCell>
              <TableCell>{driver.total_points}</TableCell>
              <TableCell>{driver.raceId}</TableCell>
              <TableCell>{driver.constructorId}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </ScrollArea>
    </Table>

  )
}
