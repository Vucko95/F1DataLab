"use client";
import { ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip,LabelList } from "recharts";
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
    <Card className="h-[44vh] w-full max-w-[78vh] flex flex-col items-center justify-between">
      <CardContent className="p-2 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={{}}>
            <BarChart
              data={chartData}
              margin={{ top: 50, right: 10, bottom: 10, left: -30 }}
            >
              <text
                x="50%"
                y={30}
                textAnchor="middle"
                fontSize={20}
                fontFamily="monospace"
                // fontWeight="bold"
                fill="hsl(var(--primary))"
              >
                Average Points per Season
              </text>
              {/*
                <XAxis
                  axisLine={false}
                  tickLine={false}
                  dataKey="name"
                  tickFormatter={(name) => name?.slice(0, 3)}
                  tick={{ fontSize: 15, fontWeight: "bold", fill: "#888" }}
                />
              */}
              <YAxis
                tickLine={false}
                tick={{ fontSize: 14, fontWeight: "bold", fill: "#333" }}
                axisLine={false}
              />
              <Tooltip content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="value" radius={5} barSize={55}>
                <LabelList
                  dataKey="name"
                  position="insideTop"
                  angle={-90}
                  offset={-30}
                  style={{ fontWeight: "bold", fontSize: 16 }}
                  dx={-4}
                />
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
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
