"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchConstructorStandingsYear } from "@/app/services/api";

interface TableCardProps {
  year: number;
}

interface ConstructorStanding {
  constructor_name: string;
  constructorId: number;
  total_points: number;
}

export function ConstructorsTable({ year }: TableCardProps) {
  const [constructors, setConstructors] = useState<ConstructorStanding[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ConstructorStanding[] = await fetchConstructorStandingsYear(year);
        setConstructors(data);
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
<Card className="p-1 h-full flex flex-col">
<CardHeader className="p-2 pb-4 flex justify-center items-center text-lg">Constructor Standigns </CardHeader>
        <Table >
        <TableHeader className="sticky top-0 bg-background z-10">
        <TableRow>
              <TableHead className="text-center">Constructor</TableHead>
              <TableHead className="text-center">Total Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {constructors.map((constructor) => (
              <TableRow key={constructor.constructorId} className="text-center">
                <TableCell className="flex justify-center gap-x-2" >
                  <Image src={`/images/constructors/${constructor.constructorId}.webp`} alt="Constructor Logo" width={25} height={25} className="rounded-sm" />
                  {constructor.constructor_name}
                </TableCell>
                <TableCell>{constructor.total_points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </Card>
  );
}
