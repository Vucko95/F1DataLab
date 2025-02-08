
"use client";
import { useEffect, useState } from "react"
import { fetchConstructorPointsForGraph } from "@/app/services/api"
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
        
        const data = await fetchConstructorPointsForGraph(year);
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




  // const color1 = getComputedStyle(document.documentElement).getPropertyValue('--chart-custom-color1').trim();
  // const color2 = getComputedStyle(document.documentElement).getPropertyValue('--chart-custom-color2').trim();
  // const color3 = getComputedStyle(document.documentElement).getPropertyValue('--chart-custom-color3').trim();


// TODO ! ADD MAPPING TO BE CONSTRUCTOR NAME INSTEAD OF ID !
const constructorColors: { [key: string]: string } = {
  9: "#3671C6",
  131: "#00D2BE",
  6: "#DC0000",
  1: "#FF8700",
  117: "#0090FF",
  214: "#005AFF",
  213: "#2B4562",
  3: "#0092DA",
  210: "#B6BABD",
  51: "#fff888",
};
const constructorNames: { [key: number]: string } = {
  9: "Red Bull Racing",
  131: "Mercedes",
  6: "Ferrari",
  1: "McLaren",
  117: "Aston Martin",
  214: "Alpine",
  213: "AlphaTauri",
  3: "Williams",
  210: "Haas",
  51: "Alfa Romeo",
};
  return (
    <Card className="h-[44vh] w-[78vh] pr-8 pt-3 flex flex-col items-center justify-between">
      <CardHeader
        className="absolute">
        <h1>Constructor Points after each Race</h1>
      </CardHeader>
      <CardContent className="h-[44vh] w-[78vh] pb-4">
        <ChartContainer config={{}}>
          <LineChart accessibilityLayer data={chartData} margin={{left: 1,right: 1,}}>
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
            {Object.keys(constructorColors).map((constructorKey) => (
              <Line
                key={constructorKey}
                dataKey={constructorKey}
                type="monotone"
                stroke={constructorColors[constructorKey]}
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
