"use client"
import { Pie, PieChart } from "recharts"
import { fetchRacePaceData } from "@/app/services/api";
import { TrendingUp } from "lucide-react"
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip,ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface BarGraphProps {
  raceId: number;
}
interface RacePaceObject {
  driver: string;
  worst_lap: number;
  best_lap: number;
  color: string;
}

export function RacePaceCard({raceId}: BarGraphProps) {

  const [drivers, setDrivers] = useState<RacePaceObject[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: RacePaceObject[] = await fetchRacePaceData(raceId);
        setDrivers(data);
        console.log(data)
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
    driver: driver.driver,
    best_lap: driver.best_lap,
    worst_lap: driver.worst_lap,
    color: driver.color,
  }));


  return (
    <Card className="h-[44vh] w-[78vh] pr-8 pt-3 flex flex-col items-center justify-between">
      <CardContent className="h-[44vh] w-[80vh] pt-4 ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={55}>
            <XAxis axisLine={false} tickLine={false} dataKey="driver"
             tickFormatter={(name) => name?.slice(0, 3)}tick={{ fontSize: 15, fontWeight: "bold", fill: "#888" }}/>
            <YAxis axisLine={false} tickLine={false} 
            tick={{ fontSize: 15, fontWeight: "bold", fill: "#999" }}
             />

            {/* Bar for Best Lap with hardcoded fill */}
            <Bar dataKey="best_lap" stackId="stack" name="Best Lap Time" radius={[5, 5, 5, 5]}>
              {chartData.map((entry, index) => (
                // Hardcode the color for the best lap bars
                <Cell key={`cell-best-${index}`} fill="#000000" />  
              ))}
            </Bar>

            {/* Bar for Worst Lap */}
            <Bar dataKey="worst_lap" stackId="stack" name="Worst Lap Time" radius={[5, 5, 5, 5]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-worst-${index}`} stroke="black" strokeWidth={1} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


