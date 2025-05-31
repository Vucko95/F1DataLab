
"use client";
import { useEffect, useState } from "react"
import { fetchConstructorPointsForGraph } from "@/app/services/api"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart";

interface LineCardPros {
  year: number;
}

export function LineCard({ year }: LineCardPros) {

  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchConstructorPointsForGraph(year);
        setChartData(data);
      } catch (error) {
        console.error("Error fetching driver standings:", error);
      }
    };
    fetchData();
  }, [year]);


const constructorColors: { [key: string]: string } = {
  red_bull: "#3671C6",
  mercedes: "#00D2BE",
  ferrari: "#DC0000",
  mclaren: "#FF8700",
  aston_martin: "#0090FF",
  alpine: "#005AFF",
  rb: "#2B4562",
  williams: "#0092DA",
  haas: "#B6BABD",
  sauber: "#fff888",
};
// TODO Add Full names instead of DB Generated ones
const constructorNames: { [key: string]: string } = {
  red_bull: "Red Bull Racing",
  mercedes: "Mercedes",
  ferrari: "Ferrari",
  mclaren: "McLaren",
  aston_martin: "Aston Martin",
  alpine: "Alpine",
  rb: "RB",
  williams: "Williams",
  haas: "Haas",
  sauber: "Sauber",
};
  return (
    <Card>
      <CardContent>
        <ChartContainer config={{}}>
          <LineChart   data={chartData} margin={{ top: 18, right: -10, left: -30, bottom: -10 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="race_name" tickLine={false}axisLine={false}/>
            <YAxis tickLine={false} axisLine={false} />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {Object.keys(constructorColors).map((constructorKey) => (
              <Line
                key={constructorKey}
                dataKey={constructorKey}
                // type="monotone" # THIS Smooths the corners of line graph
                stroke={constructorColors[constructorKey]}
                strokeWidth={4}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
