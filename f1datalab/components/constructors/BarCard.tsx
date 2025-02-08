"use client";

import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { fetchConstructorStandingsYearBar } from "@/app/services/api";

interface BarGraphProps {
  year: number;
}

interface ConstructorStandingTree {
  constructorId: number;
  constructor_name: string;
  total_points: number;
  color: string;
}

export function BarCard({ year }: BarGraphProps) {
  const [constructors, setConstructors] = useState<ConstructorStandingTree[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ConstructorStandingTree[] = await fetchConstructorStandingsYearBar(year);
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

  const chartData = constructors.map((constructor) => ({
    name: constructor.constructor_name,
    value: constructor.total_points,
    color: constructor.color,
  }));
  return (
    <Card className="h-[44vh] w-[78vh] pr-8 flex flex-col items-center justify-between">
      <CardHeader
        className="absolute">
        <h1>Average Constructor Points per Race</h1>
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
