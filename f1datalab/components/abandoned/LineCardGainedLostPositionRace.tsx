"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { fetchRaceStartFinishDiff2 } from "@/app/services/api";
import { useEffect, useState, useMemo } from "react";

interface LineCardPros {
  raceId: number;
}

interface RaceDifference {
  driver_name: string;
  driver_name_short: string;
  starting_position: number;
  ending_position: number;
  color: string;
}

export function LineCardGainedLostPositionRace({ raceId }: LineCardPros) {
  const [raceStats, setRaceStats] = useState<RaceDifference[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: RaceDifference[] = await fetchRaceStartFinishDiff2(raceId);
        setRaceStats(data);
      } catch (error) {
        console.error("Error fetching driver standings:", error);
      }
    };
    fetchData();
  }, [raceId]);

  const { transformedData, positionToDriverInfo } = useMemo(() => {
    const infoMap: { [key: number]: { name: string; color: string } } = {};

    raceStats.forEach((driver) => {
      infoMap[driver.starting_position] = {
        name: driver.driver_name,
        color: driver.color,
      };
      infoMap[driver.ending_position] = {
        name: driver.driver_name,
        color: driver.color,
      };
    });

    const transformed = raceStats.flatMap((driver) => [
      {
        driver_name: driver.driver_name,
        position: driver.starting_position,
        color: driver.color,
        xAxisValue: 0,
      },
      {
        driver_name: driver.driver_name,
        position: driver.ending_position,
        color: driver.color,
        xAxisValue: 1,
      },
    ]);

    return {
      transformedData: transformed,
      positionToDriverInfo: infoMap,
    };
  }, [raceStats]);
  console.log('ace')
  console.log(raceStats)
  return (
    <Card className="h-[44vh] w-[78vh] pt-6 pl-10 flex flex-col items-center justify-between">
      <CardHeader className="absolute"></CardHeader>
      <CardContent className="h-[44vh] w-[78vh]">
        <ChartContainer config={{}}>
          <LineChart
            // width={500}
            // height={300}
            margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
            data={transformedData}
          >
            <CartesianGrid />
            <XAxis
              dataKey="xAxisValue"
              type="number"
              axisLine={false}
              // ticks={[0, 1]}
              hide={true}
              tickFormatter={(value) => (value === 0 ? "Start" : "Finish")}
              domain={[0, 1]}
            />
            <YAxis
              reversed
              // domain={[10, 1]}
              // ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              // tick={{ fontSize: 18, fontWeight: "bold", fill: "#333", }}
              tickFormatter={(value) => {
                const driverInfo = positionToDriverInfo[value];
                return driverInfo ? driverInfo.name : value;
              }}
              axisLine={false}
              // interval={0}
            />
            <YAxis
              reversed
              yAxisId="right"
              orientation="right"
              // domain={[10, 1]}
              // ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              tick={{
                fontSize: 18,
                fontWeight: "bold",
                fill: "#333",
              }}
              axisLine={false}
              interval={0}
            />
            {raceStats.map((driver) => (
              <Line
                key={driver.driver_name}
                dataKey="position"
                data={transformedData.filter(
                  (d) => d.driver_name === driver.driver_name
                )}
                stroke={driver.color}
                strokeWidth={5}
                name={driver.driver_name}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
