"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { fetchRaceDetailsSummary } from "@/app/services/api";
import { useEffect, useState } from "react";
import { nationalityToFlag } from "@/lib/utils";
import Image from "next/image";

interface RaceIdProps {
  raceId: number;
}

interface WinnerInfo {
  year: number;
  driver_name: string;
  constructor_id: number;
  nationality: string;
}

interface RaceSummary {
  raceId: number;
  race_year: number;
  circuit_name: string;
  circuit_country: string;
  circuit_location: string;
  previous_year_winners: WinnerInfo[];
}

export function RaceCircuitInfo({ raceId }: RaceIdProps) {
  const [raceSummary, setRaceSummary] = useState<RaceSummary | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: RaceSummary = await fetchRaceDetailsSummary(raceId);
        setRaceSummary(data);
      } catch (error) {
        console.error("Error fetching race summary:", error);
      }
    };
    fetchData();
  }, [raceId]);

  if (!raceSummary) return null;

  return (
    <Card>
      <CardContent>
        <div className="flex items-center space-x-6 p-4">
        <Image
        className="rounded-[20px]"
        src="/images/circuit/austrian.png" 
          alt=""
          width={100}
          height={100}
        />
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold">
              {raceSummary.circuit_country} {raceSummary.circuit_location}
            </h3>

            <h5 className="text-md text-gray-600 dark:text-gray-300">
              {raceSummary.circuit_name} {raceSummary.race_year}
            </h5>
            <hr className="mt-2 border-t-2 border-gray-300 dark:border-gray-600 w-full" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Year</TableHead>
              <TableHead className="text-center"></TableHead>
              <TableHead className="text-center">Driver</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {raceSummary.previous_year_winners.map((winner, index) => {
              const nationalityFlag =
                nationalityToFlag[winner.nationality] || "us";
              return (
                <TableRow key={index} className="text-center">
                  <TableCell>{winner.year}</TableCell>
                  <TableCell>
                    <Image
                      src={`https://flagcdn.com/${nationalityFlag}.svg`}
                      alt={`${winner.nationality} Flag`}
                      width={20}
                      height={20}
                      className="rounded-sm"
                    />
                  </TableCell>
                  <TableCell>{winner.driver_name}</TableCell>
                  <TableCell className="flex justify-center">
                    <Image
                      src={`/images/constructors/${winner.constructor_id}.webp`}
                      alt="Constructor Logo"
                      width={25}
                      height={25}
                      className="rounded-sm"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
