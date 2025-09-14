"use client";
import { ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip,LabelList } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { fetchConstructorStandingsYearBar } from "@/app/services/api";

interface BarGraphProps {
  year: number;
}

interface ConstructorStandingTree {
  constructorId: number;
  constructor_name: string;
  total_points: number;
  color: string;
}

export function BarCard({ year }: BarGraphProps) {
  const [constructors, setConstructors] = useState<ConstructorStandingTree[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ConstructorStandingTree[] = await fetchConstructorStandingsYearBar(year);
        setConstructors(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching driver standings:", error);
      }
    };
    fetchData();
  }, [year]);
  
  const chartData = constructors.map((constructor) => ({
    name: constructor.constructor_name,
    value: constructor.total_points,
    color: constructor.color,
  }));
  
  return (
    <Card className="h-[44vh] w-full max-w-[78vh] flex flex-col items-center justify-between">
      <CardContent className="p-2 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={{}}>
            <BarChart
              data={chartData}
              margin={{ top: 60, right: 10, bottom: 10, left: -30 }}
            >
              <text
                x="50%"
                y={20}
                textAnchor="middle"
                fontSize={20}
                fontFamily="monospace"
                // fontWeight="bold"
                fill="hsl(var(--primary))"
              >
                Average Team points per race
              </text>
              {/*
                <XAxis
                  axisLine={false}
                  tickLine={false}
                  dataKey="name"
                  tickFormatter={(name) => name?.slice(0, 3)}
                  tick={{ fontSize: 15, fontWeight: "bold", fill: "#888" }}
                />
              */}
              <YAxis
                tickLine={false}
                tick={{ fontSize: 14, fontWeight: "bold", fill: "#333" }}
                axisLine={false}
              />
              <Tooltip content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="value" radius={5} barSize={55}>
                <LabelList
                  dataKey="name"
                  position="insideTop"
                  angle={-90}
                  offset={-30}
                  style={{ fontWeight: "bold", fontSize: 16 }}
                  dx={-4}
                />
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    stroke="black"
                    strokeWidth={0.5}
                    fill={entry.color || "#888888"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
