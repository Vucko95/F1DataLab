"use client";

import { BarChart, Bar, Cell, XAxis, Legend,  YAxis, Tooltip,ReferenceLine ,ResponsiveContainer,  } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { fetchRacesConstructorBarChart } from "@/app/services/api";
import { Customized } from "recharts";
import Image from "next/image";
interface BarGraphProps {
  raceId: number;
}

interface BarChartConstructor {
  driver_name: string;
  gained: number;
  lost: number;
  color: string;
}

const data = [
  { driver_name: 'russell', gained: 5, lost: 0, color: '#00D2BE' },
  { driver_name: 'verstappen', gained: 4, lost: 0, color: '#82ca9d' },
  { driver_name: 'hamilton', gained: 0, lost: -3, color: '#8884d8' },
  { driver_name: 'leclerc', gained: 2, lost: 0, color: '#D92A3E' },
  { driver_name: 'perez', gained: 0, lost: -4, color: '#1E41FF' },
  { driver_name: 'sainz', gained: 0, lost: -2, color: '#D92A3E' },
  { driver_name: 'norris', gained: 3, lost: 0, color: '#FF8700' },
  { driver_name: 'alonso', gained: 0, lost: -1, color: '#006F62' },
  { driver_name: 'gasly', gained: 0, lost: -5, color: '#2173B8' },
  { driver_name: 'ocon', gained: 2, lost: 0, color: '#2173B8' },
];

export function BarGridPositionCard({  raceId }: BarGraphProps) {
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

  const chartData = drivers.map((driver) => ({
    // constructorId: driver.constructorId,
    // value: driver.points,
    color: driver.color,
  }));
  return (
    <Card className="h-[44vh] w-[78vh] pr-8 flex flex-col items-center justify-between">
      <CardHeader
        className="absolute">
        <h1>Positions gained/lost during the race</h1>
      </CardHeader>
      <CardContent className="w-[80vh] pt-2">
        <ChartContainer config={{}}>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          stackOffset="sign"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="driver_name"
          // LEGEND
          tick={{ fontSize: 14, fontWeight: "bold", fill: "#333" }}

            axisLine={false}
            tickLine={false} />
          <YAxis               tickLine={false}
              tick={{ fontSize: 14, fontWeight: "bold", fill: "#333" }}
              axisLine={false}/>
          {/* <Tooltip /> */}
          <ReferenceLine y={0} stroke="#000" />
          {/* <Legend wrapperStyle={{ fontSize: 16, fontWeight: "bold" }} /> */}

          {/* Use `Cell` to apply color to individual bars */}
          <Bar dataKey="lost" stackId="stack" radius={5} barSize={55} >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
          <Bar dataKey="gained" stackId="stack" radius={5} barSize={55}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`}  fill={entry.color} />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
