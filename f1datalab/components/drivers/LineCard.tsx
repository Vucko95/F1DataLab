
"use client";
import { useEffect, useState } from "react"
import { fetchDriversPointsForGraph } from "@/app/services/api"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface LineCardPros {
  year: number;
}

export function LineCard({ year }: LineCardPros) {

  const [chartData, setChartData] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const data = await fetchDriversPointsForGraph(year);
        // const data: DriverStandingTree[] = await fetchDriverStandingsYearBar(year);
        setChartData(data);
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




  const color1 = getComputedStyle(document.documentElement).getPropertyValue('--chart-custom-color1').trim();
  const color2 = getComputedStyle(document.documentElement).getPropertyValue('--chart-custom-color2').trim();
  const color3 = getComputedStyle(document.documentElement).getPropertyValue('--chart-custom-color3').trim();


  // const [chartData] = useState([
  //   { race: 1, max_verstappen: 0, perez: 0, hamilton: 0 },
  //   { race: 2, max_verstappen: 25, perez: 18, hamilton: 15 },
  //   { race: 3, max_verstappen: 50, perez: 36, hamilton: 30 },
  //   { race: 4, max_verstappen: 75, perez: 54, hamilton: 45 },
  //   { race: 5, max_verstappen: 110, perez: 85, hamilton: 70 },
  //   { race: 6, max_verstappen: 140, perez: 110, hamilton: 95 },
  //   { race: 7, max_verstappen: 200, perez: 150, hamilton: 130 },
  //   { race: 8, max_verstappen: 280, perez: 210, hamilton: 190 },
  //   { race: 9, max_verstappen: 310, perez: 250, hamilton: 230 },
  //   { race: 10, max_verstappen: 350, perez: 280, hamilton: 270 },
  // ]);

const driverColors: { [key: string]: string } = {
  max_verstappen: "#3671C6",
  perez: "#3671C6",
  hamilton: "#00D2BE",
  russell: "#00D2BE",
  leclerc: "#DC0000",
  sainz: "#DC0000",
  norris: "#FF8700",
  piastri: "#FF8700",
  alonso: "#0090FF",
  stroll: "#0090FF",
  gasly: "#005AFF",
  ocon: "#005AFF",
  tsunoda: "#2B4562",
};

  return (
    <Card className="h-[44vh] w-[78vh] pr-8 pt-3 flex flex-col items-center justify-between">
      <CardHeader
        className="absolute">
        <h1>Driver Points after each Race</h1>
      </CardHeader>
      <CardContent className="h-[44vh] w-[78vh] pb-4">
        <ChartContainer config={{}}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 1,
              right: 1,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="race"
              tickLine={false}
              axisLine={false}
              tickMargin={2}
              tick={{ fontSize: 14, fontWeight: "bold", fill: "#888" }}
            />
            <YAxis
              domain={[0, 350]}
              tickLine={false}
              tick={{ fontSize: 14, fontWeight: "bold", fill: "#333" }}
              axisLine={false}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {Object.keys(driverColors).map((driverKey) => (
              <Line
                key={driverKey}
                dataKey={driverKey}
                type="monotone"
                stroke={driverColors[driverKey]}
                strokeWidth={3}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
