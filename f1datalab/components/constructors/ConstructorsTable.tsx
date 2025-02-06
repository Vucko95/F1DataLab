"use client";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchConstructorStandingsYear } from "@/app/services/api";

interface ConstructorsTableProps {
  year: number;
}

interface ConstructorStanding {
  constructor_name: string
  constructorId: number;
  total_points: number;
}

export function ConstructorsTable({ year }: ConstructorsTableProps) {
  const [constructors, setconstructors] = useState<ConstructorStanding[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ConstructorStanding[] = await fetchConstructorStandingsYear(year);
        setconstructors(data);
      } catch (error) {
        console.error("Error fetching constructor standings:", error);
      }
    };
    if (isMounted) {
      fetchData();
    }
  }, [year, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <Table>
      <ScrollArea className="h-[40vh] w-[73vh] " type="always">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Constructor ID</TableHead>
            <TableHead className="text-center"></TableHead>
            <TableHead className="text-center">Constructor</TableHead>
            <TableHead className="text-center">Total Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {constructors.map((constructor) => {
            return (
              <TableRow key={constructor.constructorId} className="text-center">
                <TableCell>{constructor.constructorId}</TableCell>
                <TableCell className="flex justify-center">
                  <Image
                    src={`/images/constructors/${constructor.constructorId}.webp`}
                    alt="Constructor Logo"
                    width={25}
                    height={25}
                    className="rounded-sm"
                  />
                </TableCell>
                <TableCell>{constructor.constructor_name}</TableCell>
                <TableCell>{constructor.total_points}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </ScrollArea>
    </Table>
  );
}
