"use client"
import { useEffect, useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { fetchRaceScatterPlot } from "@/app/services/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const formatMillisecondsToTime = (milliseconds: number | null) => {
  if (milliseconds === null || isNaN(milliseconds)) return "N/A";
  const totalSeconds = milliseconds / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toFixed(0).padStart(2, '0')}:${seconds.toFixed(3).padStart(6, '0')}`;
};

export interface DriverLapDataRaw {
  name: string;
  color: string;
  times: { lap: number; time: number }[];
}

export interface CombinedLapTimeData {
  driverName: string;
  time: number;
  lap: number;
  color: string;
  xPosition: number;
}

interface DriverLapTimesProps {
  raceId: number;
}

export function RaceScatterPlot({ raceId }: DriverLapTimesProps) {
  const [rawDriverData, setRawDriverData] = useState<DriverLapDataRaw[]>([]);
  const [combinedLapTimes, setCombinedLapTimes] = useState<CombinedLapTimeData[]>([]);
  const [uniqueDriverNamesOrder, setUniqueDriverNamesOrder] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: DriverLapDataRaw[] = await fetchRaceScatterPlot(raceId);
        setRawDriverData(data);

        const namesOrder = data.map(driver => driver.name);
        setUniqueDriverNamesOrder(namesOrder);

        const driverNameToIndex = new Map<string, number>();
        namesOrder.forEach((name, index) => {
          driverNameToIndex.set(name, index);
        });

        const maxLap = Math.max(...data.flatMap(driver => driver.times.map(t => t.lap)));

        const transformedData: CombinedLapTimeData[] = [];

        const LANE_WIDTH_FACTOR = 0.8;

        data.forEach(driver => {
          const driverIndex = driverNameToIndex.get(driver.name)!;
          driver.times.forEach(lapInfo => {
            const xPosWithinLane = (lapInfo.lap - 1) / (maxLap > 0 ? maxLap : 1);
            const xPosition = driverIndex + (xPosWithinLane * LANE_WIDTH_FACTOR) + ((1 - LANE_WIDTH_FACTOR) / 2);
            transformedData.push({
              driverName: driver.name,
              time: lapInfo.time,
              lap: lapInfo.lap,
              color: driver.color,
              xPosition: xPosition,
            });
          });
        });
        setCombinedLapTimes(transformedData);
      } catch (error) {
        console.error("Error fetching lap time scatter plot data:", error);
      }
    };
    fetchData();
  }, [raceId]);

  const allTimes = combinedLapTimes.map(d => d.time);
  const minTime = allTimes.length > 0 ? Math.min(...allTimes) : 0;
  const maxTime = allTimes.length > 0 ? Math.max(...allTimes) : 100000;
  const yDomainStart = minTime > 0 ? minTime - 300 : 0;
  const yDomainEnd = maxTime + 300;

  const xAxisTicks = uniqueDriverNamesOrder.map((_, index) => index + 0.5);

  return (
    <Card className="h-[58.6vh] w-full flex flex-col items-center justify-between">
      <CardHeader className="absolute z-10">
        <h1 className="text-2xl font-bold text-primary mb-2 font-mono ">Lap Times for the Selected Race</h1>
      </CardHeader>
      <CardContent className="pt-14 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            }}
          >
            <CartesianGrid stroke="rgba(255, 255, 255, 0.05)" horizontal={false} />
            <XAxis
              type="number"
              dataKey="xPosition"
              name="Driver"
              tickLine={false}
              angle={-34}
              height={60}
              tick={{ fontSize: 14, fontWeight: 'bold' }}
              ticks={xAxisTicks}
              tickFormatter={(tickValue: number) => {
                const driverIndex = Math.floor(tickValue);
                return uniqueDriverNamesOrder[driverIndex] || '';
              }}
              domain={[-0.5, uniqueDriverNamesOrder.length > 0 ? uniqueDriverNamesOrder.length - 0.5 : 0.5]}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis
              tick={{ fontSize: 14, fontWeight: 'bold' }}
              type="number"
              dataKey="time"
              name="Lap Time"
              unit=""
              tickFormatter={formatMillisecondsToTime}
              domain={[yDomainStart, yDomainEnd]}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name, props) => {
                const hoveredData = props.payload as CombinedLapTimeData;
                const lapTimeFormatted = formatMillisecondsToTime(hoveredData.time);
                const lapNumber = hoveredData.lap;
                return [`${lapTimeFormatted} (Lap ${lapNumber})`, 'Lap Time'];
              }}
            />
            <Scatter
              name="Lap Times"
              data={combinedLapTimes}
              stroke="#000"
              strokeWidth={1.3}
            >
              {combinedLapTimes.map((entry, index) => (
                <Cell
                  key={`cell-${entry.driverName}-${index}`}
                  fill={entry.color}
                  r={5}
                  fillOpacity={1}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
