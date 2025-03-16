"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

interface LineCardPros {
  year: number;
}

export function LineCard({ year }: LineCardPros) {
  const data = [
    {
      driver_name: "verstappen",
      starting_position: 1,
      ending_position: 3,
      color: "#82ca9d",
    },
    {
      driver_name: "hamilton",
      starting_position: 5,
      ending_position: 2,
      color: "#8884d8",
    },
    {
      driver_name: "leclerc",
      starting_position: 3,
      ending_position: 4,
      color: "#D92A3E",
    },
    {
      driver_name: "perez",
      starting_position: 2,
      ending_position: 1,
      color: "#1E41FF",
    },
    {
      driver_name: "russell",
      starting_position: 4,
      ending_position: 5,
      color: "#00D2BE",
    },
    {
      driver_name: "sainz",
      starting_position: 6,
      ending_position: 6,
      color: "#D92A3E",
    },
    {
      driver_name: "norris",
      starting_position: 7,
      ending_position: 7,
      color: "#FF8700",
    },
    {
      driver_name: "alonso",
      starting_position: 8,
      ending_position: 8,
      color: "#006F62",
    },
    {
      driver_name: "gasly",
      starting_position: 9,
      ending_position: 10,
      color: "#2173B8",
    },
    {
      driver_name: "ocon",
      starting_position: 10,
      ending_position: 9,
      color: "#2173B8",
    },
  ];

  const positionToDriverInfo: { [key: number]: { name: string; color: string } } = {};

  data.forEach((driver) => {
    if (!positionToDriverInfo[driver.starting_position]) {
      positionToDriverInfo[driver.starting_position] = {
        name: driver.driver_name,
        color: driver.color,
      };
    }
  });

  data.forEach((driver) => {
    if (!positionToDriverInfo[driver.ending_position]) {
      positionToDriverInfo[driver.ending_position] = {
        name: driver.driver_name,
        color: driver.color,
      };
    }
  });

  const transformedData = data.flatMap((driver) => [
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

  return (
    <Card className="h-[44vh] w-[78vh] pt-6 pl-10 flex flex-col items-center justify-between">
      <CardHeader className="absolute"></CardHeader>
      <CardContent className="h-[44vh] w-[78vh] ">
        <ChartContainer config={{}}>
          <LineChart width={500} height={300}
            margin={{ top: 30, right: 30, bottom: 30, left: 30 }}

          data={transformedData}>
            <CartesianGrid />
            <XAxis
              dataKey="xAxisValue"
              type="number"
              axisLine={false}
              ticks={[0, 1]}
              hide={true}
              tickFormatter={(value) => (value === 0 ? "Start" : "Finish")}
              domain={[0, 1]}
            />
            <YAxis
              reversed
              domain={[10, 1]}
              ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              tick={{
                fontSize: 18,
                fontWeight: "bold",
                fill: "#333",
              }}
              tickFormatter={(value) => {
                const driverInfo = positionToDriverInfo[value];
                return driverInfo ? driverInfo.name : value;
              }}
              axisLine={false}
              interval={0}
              />
            <YAxis
              reversed
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 18, fontWeight: "bold", fill: "#333" }}
              domain={[10, 1]}
              ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              axisLine={false}
              interval={0}
            />
            {data.map((driver) => (
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