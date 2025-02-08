"use client";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { fetchConstructorStandingsYear } from "@/app/services/api";

interface ConstructorsTableProps {
  year: number;
}

interface ConstructorStanding {
  constructor_name: string;
  constructorId: number;
  total_points: number;
}

export function ConstructorsTable({ year }: ConstructorsTableProps) {
  const [constructors, setConstructors] = useState<ConstructorStanding[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const totalPages = Math.ceil(constructors.length / itemsPerPage);
  const paginatedConstructors = constructors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col items-center ">
      

      <Table>
        {/* <ScrollArea className="h-[40vh] w-[73vh]" type="always"> */}
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Constructor ID</TableHead>
              <TableHead className="text-center"></TableHead>
              <TableHead className="text-center">Constructor</TableHead>
              <TableHead className="text-center">Total Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedConstructors.map((constructor) => (
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
            ))}
          </TableBody>
        {/* </ScrollArea> */}
      </Table>
      <div className="flex justify-between w-full ">
        <Button 
            className="bg-sidebar text-foreground border-gray-600 hover:bg-gray-700"

          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        {/* <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span> */}
        <Button
            className="bg-sidebar text-foreground border-gray-600 hover:bg-gray-700"

          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
