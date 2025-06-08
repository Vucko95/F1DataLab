"use client"
import { useEffect, useState } from "react";
import { fetchRacePitStopDetails } from "@/app/services/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PitStopProps {
  raceId: number;
}

export interface PitStopData {
  driverId: string;
  driver_name: string;
  driverRef: string;
  [key: `pitStop${number}`]: number | undefined;
}

function getPitStopKeys(data: PitStopData[]) {
  const keys = new Set<string>();
  data.forEach(d => {
    Object.keys(d).forEach(k => {
      if (k.startsWith("pitStop")) keys.add(k);
    });
  });
  return Array.from(keys).sort();
}

export function PitStops({ raceId }: PitStopProps) {
  const [pitStops, setPitStops] = useState<PitStopData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: PitStopData[] = await fetchRacePitStopDetails(raceId);
        setPitStops(data);
      } catch (error) {
        console.error("Error fetching pit stop data:", error);
      }
    };
    fetchData();
  }, [raceId]);

  const pitStopKeys = getPitStopKeys(pitStops);

  return (
    <Card className="h-[58.6vh] w-full flex flex-col items-center justify-between">
      <CardHeader className="absolute">
        <h1 className="text-lg">Pit Stop Times for the selected Race</h1>
      </CardHeader>
      <CardContent className="pt-14 w-full h-full">
        <ResponsiveContainer>
          <BarChart data={pitStops}
              margin={{ bottom: 40 }}
            >
            <XAxis 
              dataKey="driverRef" 
              angle={-34} 
              textAnchor="end" 
              interval={0} 
               tick={{ fontSize: 14, fontWeight: 'bold' }}
              height={40}
            />
            <YAxis
              label={{ value: 'Pit Stop Time (ms)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value, name) => {
                if (typeof name === "string" && name.startsWith("pitStop")) {
                  const pitStopNumber = name.replace("pitStop", "Pit Stop ");
                  return [`${value} ms`, pitStopNumber];
                }
                return [value, name];
              }}
              labelFormatter={(label) => `Driver: ${label}`}
            />
            <Legend verticalAlign="top" />
            {pitStopKeys.map((key, idx) => {
                const colors = ["#FFD700", "#00BFFF", "#FF69B4", "#32CD32", "#FF4500", "#8A2BE2", "#20B2AA", "#FF8C00", "#DC143C", "#1E90FF"];
              return (
              <Bar
                key={key}
                dataKey={key}
                stackId="totalPitTime"
                fill={colors[idx % colors.length]}
                name={`Pit Stop ${idx + 1}`}
              />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
