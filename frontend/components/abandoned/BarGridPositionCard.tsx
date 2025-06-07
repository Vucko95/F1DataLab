"use client";

import { BarChart, Bar, Cell, XAxis, Legend,  YAxis, Tooltip,ReferenceLine ,ResponsiveContainer,  } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { fetchRaceStartFinishDiff } from "@/app/services/api";
import { Customized } from "recharts";
import Image from "next/image";
interface BarGraphProps {
  raceId: number;
}

interface BarChartConstructor {
  driver_name: string;
  driver_name_short: string;
  gained: number;
  lost: number;
  color: string;
}

// const data = [
//   { driver_name: 'russell', gained: 5, lost: 0, color: '#00D2BE' },
//   { driver_name: 'verstappen', gained: 4, lost: 0, color: '#82ca9d' },
//   { driver_name: 'hamilton', gained: 0, lost: -3, color: '#8884d8' },
//   { driver_name: 'leclerc', gained: 2, lost: 0, color: '#D92A3E' },
//   { driver_name: 'perez', gained: 0, lost: -4, color: '#1E41FF' },
//   { driver_name: 'sainz', gained: 0, lost: -2, color: '#D92A3E' },
//   { driver_name: 'norris', gained: 3, lost: 0, color: '#FF8700' },
//   { driver_name: 'alonso', gained: 0, lost: -1, color: '#006F62' },
//   { driver_name: 'gasly', gained: 0, lost: -5, color: '#2173B8' },
//   { driver_name: 'ocon', gained: 2, lost: 0, color: '#2173B8' },
// ];

export function BarGridPositionCard({  raceId }: BarGraphProps) {
  const [drivers, setDrivers] = useState<BarChartConstructor[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: BarChartConstructor[] = await fetchRaceStartFinishDiff(raceId);
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
    <Card >
      <CardContent >
        <ChartContainer config={{}}>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={drivers} stackOffset="sign" margin={{ top: 18, right: -10, left: -30, bottom: -10 }} >
            <XAxis dataKey="driver_name_short" tick={{ fontSize: 14, fontWeight: "bold", fill: "#333" }} axisLine={false} tickLine={false} />
            <YAxis tickLine={false} tick={{ fontSize: 14, fontWeight: "bold", fill: "#333" }} axisLine={false} />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="lost" stackId="stack" radius={5} barSize={55}>
              {drivers.map((entry, index) => (
                <Cell key={`cell-lost-${index}`} fill={entry.color} />
              ))}
            </Bar>
            <Bar dataKey="gained" stackId="stack" radius={5} barSize={55}>
              {drivers.map((entry, index) => (
                <Cell key={`cell-gained-${index}`} fill={entry.color} />
              ))}
            </Bar>
        </BarChart>
      </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
