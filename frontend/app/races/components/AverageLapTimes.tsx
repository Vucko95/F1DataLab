"use client"
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchAverageLapTimes } from "@/app/services/api";

const formatMillisecondsToTime = (milliseconds: number | null) => {
  if (milliseconds === null || isNaN(milliseconds)) return "N/A";
  const totalSeconds = milliseconds / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toFixed(0).padStart(2, '0')}:${seconds.toFixed(3).padStart(6, '0')}`;
};

export interface AverageLapTimeData {
  driverName: string;
  averageMilliseconds: number;
  driverRef: string;
  driverId: number;
  color: string;
}

interface AverageLapTimesProps {
  raceId: number;
}

export function AverageLapTimes({ raceId }: AverageLapTimesProps) {
  const [averageTimes, setAverageTimes] = useState<AverageLapTimeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: AverageLapTimeData[] = await fetchAverageLapTimes(raceId);
        setAverageTimes(data);
      } catch (error) {
        console.error("Error fetching average lap times data:", error);
      }
    };
    fetchData();
  }, [raceId]);

  const minLapTime = averageTimes.length > 0 ? Math.min(...averageTimes.map(d => d.averageMilliseconds)) : 0;
  const maxLapTime = averageTimes.length > 0 ? Math.max(...averageTimes.map(d => d.averageMilliseconds)) : 100000;

  const xDomainStart = minLapTime > 0 ? minLapTime - 500 : 0;
  const xDomainEnd = maxLapTime + 200;

  return (
    <Card className="h-[58.6vh] w-full flex flex-col items-center justify-between">
      <CardHeader className="absolute">
        <h1 className="text-xl  text-primary mb-2 font-mono ">Average Lap Times</h1>
      </CardHeader>
      <CardContent className="pt-14 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={averageTimes} layout="vertical">
            <XAxis
              type="number"
              dataKey="averageMilliseconds"
              tickFormatter={formatMillisecondsToTime}
              domain={[xDomainStart, xDomainEnd]}
              tick={{ fontSize: 14, fontWeight: 'bold' }}

            />
            <YAxis
              tick={{ fontSize: 14, fontWeight: 'bold' }}
              type="category"
              dataKey="driverName"
              width={100}
            />
            <Tooltip
              formatter={(value) => `${formatMillisecondsToTime(value as number)}`}
              labelFormatter={(label) => `Driver: ${label}`}
            />
            <Bar dataKey="averageMilliseconds" barSize={25}>
              {averageTimes.map((entry, index) => (
                <Cell key={`cell-${entry.driverId}-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
