"use client";

import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { fetchDriverStandingsYearBar } from "@/app/services/api";

interface BarGraphProps {
  year: number;
}

interface DriverStandingTree {
  driverId: number;
  raceId: number;
  constructorId: number;
  forename: string;
  surname: string;
  nationality: string;
  total_points: number;
  color: string;
}

export function BarCard({ year }: BarGraphProps) {
  const [drivers, setDrivers] = useState<DriverStandingTree[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: DriverStandingTree[] = await fetchDriverStandingsYearBar(year);
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching driver standings:", error);
      }
    };

    if (isMounted) {
      fetchData(); // Fetch data only after component mounts
    }
  }, [year, isMounted]);

  if (!isMounted) {
    return null; // Prevents hydration errors
  }

  const chartData = drivers.map((driver) => ({
    name: driver.forename,
    value: driver.total_points,
    color: driver.color,
  }));
  return (
    <Card className="h-[44vh] w-[78vh] pr-8 flex flex-col items-center justify-between">
      <CardHeader
        className="absolute">
        <h1>Average Driver Points per Race</h1>
      </CardHeader>
      <CardContent className="w-[80vh] pt-2">
        <ChartContainer config={{}}>
          <BarChart data={chartData}>
            <XAxis
              axisLine={false}
              tickLine={false}
              dataKey="name"
              tickFormatter={(name) => name?.slice(0, 3)}
              tick={{ fontSize: 15, fontWeight: "bold", fill: "#888" }}
            />
            <YAxis
              tickLine={false}
              tick={{ fontSize: 14, fontWeight: "bold", fill: "#333" }}
              axisLine={false}
            />
            <Tooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="value" radius={5} barSize={55}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  stroke="black"
                  strokeWidth={0.5}
                  fill={entry.color || "#888888"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
