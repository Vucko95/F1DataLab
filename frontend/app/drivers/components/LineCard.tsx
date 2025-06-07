
"use client";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { fetchDriversPointsForGraph } from "@/app/services/api"
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { driverColors } from "@/lib/utils";

interface LineCardPros {
  year: number;
}

export function LineCard({ year }: LineCardPros) {

  const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchDriversPointsForGraph(year);
          setChartData(data);
        } catch (error) {
          console.error("Error fetching driver standings:", error);
        }
      };
      fetchData();
    }, [year]);


  return (
    <Card>
      <CardContent>
        <ChartContainer config={{}}>

          <LineChart accessibilityLayer data={chartData} margin={{ top: 18, right: -10, left: -30, bottom: -10 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="race_name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {Object.keys(driverColors).map((driverKey) => (
              <Line key={driverKey} dataKey={driverKey} stroke={driverColors[driverKey]} strokeWidth={3} dot={false} /> ))}
          </LineChart>

        </ChartContainer>
      </CardContent>
    </Card>
  );
}
