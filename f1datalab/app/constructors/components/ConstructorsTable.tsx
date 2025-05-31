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

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data: ConstructorStanding[] = await fetchConstructorStandingsYear(year);
          setConstructors(data);
        } catch (error) {
          console.error("Error fetching driver standings:", error);
        }
      };
      fetchData();
    }, [year]);

  return (
<Card className="p-4 h-full flex flex-col">
  <CardHeader className="p-4 pb-6 flex justify-center items-center responsive-header">
    Constructor Standings
  </CardHeader>

  <Table className="responsive-text">
    <TableHeader className="sticky top-0 bg-background z-10">
      <TableRow>
        <TableHead className="text-center responsive-text">Team</TableHead>
        <TableHead className="text-center responsive-text">Total Points</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {constructors.map((constructor) => (
        <TableRow key={constructor.constructorId} className="text-center responsive-text">
          <TableCell className="flex justify-center items-center gap-x-3">
            <Image
              src={`/images/constructors/${constructor.constructorId}.webp`}
              alt="Constructor Logo"
              width={24}
              height={24}
              className="rounded-sm responsive-logo"
            />
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
