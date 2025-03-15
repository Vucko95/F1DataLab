"use client";

import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { fetchRacesConstructorBarChart } from "@/app/services/api";
import { Customized } from "recharts";
import Image from "next/image";
interface BarGraphProps {
  year: number;
  raceId: number;
}

interface BarChartConstructor {
  constructorId: number;
  points: number;
  color: string;
}

export function BarCard({ year, raceId }: BarGraphProps) {
  const [drivers, setDrivers] = useState<BarChartConstructor[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: BarChartConstructor[] = await fetchRacesConstructorBarChart(raceId);
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching driver standings:", error);
      }
    };

    if (isMounted) {
      fetchData(); // Fetch data only after component mounts
    }
  }, [raceId, isMounted]);

  if (!isMounted) {
    return null; // Prevents hydration errors
  }
  const CategoryTick = (props: any) => {
    const { x, y, payload } = props;
  
    return (
      <foreignObject x={x - 12} y={y - 5} width={25} height={25}>
        <Image
          src={`/images/constructors/${payload.value}.webp`}
          alt="Constructor Logo"
          width={25}
          height={25}
          className="rounded-sm"
        />
      </foreignObject>
    );
  };
  const chartData = drivers.map((driver) => ({
    constructorId: driver.constructorId,
    value: driver.points,
    color: driver.color,
  }));
  return (
    <Card className="h-[44vh] w-[78vh] pr-8 flex flex-col items-center justify-between">
      <CardHeader
        className="absolute">
        <h1>Constructor Points for the race</h1>
      </CardHeader>
      <CardContent className="w-[80vh] pt-2">
        <ChartContainer config={{}}>
          <BarChart data={chartData}>
          <XAxis
  axisLine={false}
  tickLine={false}
  dataKey="constructorId"
  tick={<CategoryTick />}
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
