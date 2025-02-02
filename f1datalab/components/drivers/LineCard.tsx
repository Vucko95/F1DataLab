"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { race: 1, verstappen: 0, hamilton: 0, leclerc: 0, norris: 0 },
  { race: 2, verstappen: 50, hamilton: 30, leclerc: 40, norris: 25 },
  { race: 3, verstappen: 100, hamilton: 70, leclerc: 85, norris: 65 },
  { race: 4, verstappen: 190, hamilton: 110, leclerc: 140, norris: 110 },
  { race: 5, verstappen: 192, hamilton: 190, leclerc: 180, norris: 150 },
  { race: 6, verstappen: 270, hamilton: 220, leclerc: 210, norris: 200 },
  { race: 7, verstappen: 330, hamilton: 290, leclerc: 280, norris: 230 },
  { race: 8, verstappen: 380, hamilton: 330, leclerc: 350, norris: 260 },
  { race: 9, verstappen: 430, hamilton: 380, leclerc: 390, norris: 300 },
  { race: 10, verstappen: 480, hamilton: 380, leclerc: 450, norris: 340 },
  { race: 11, verstappen: 530, hamilton: 380, leclerc: 510, norris: 380 },
  { race: 12, verstappen: 580, hamilton: 385, leclerc: 570, norris: 420 },
  { race: 13, verstappen: 630, hamilton: 420, leclerc: 620, norris: 460 },
  { race: 14, verstappen: 690, hamilton: 640, leclerc: 670, norris: 500 },
  { race: 15, verstappen: 740, hamilton: 700, leclerc: 740, norris: 540 },
  { race: 16, verstappen: 800, hamilton: 750, leclerc: 780, norris: 580 },
  { race: 17, verstappen: 950, hamilton: 820, leclerc: 850, norris: 620 },
  { race: 18, verstappen: 1200, hamilton: 880, leclerc: 930, norris: 660 },
  { race: 19, verstappen: 1300, hamilton: 940, leclerc: 1110, norris: 800 },
  { race: 20, verstappen: 1350, hamilton: 1010, leclerc: 1160, norris: 1000 },
];
  const chartConfig = {
    verstappen: {
      label: "Verstappen",
      color: "hsl(var(--chart-1))",
    },
    hamilton: {
      label: "Hamilton",
      color: "hsl(var(--chart-2))",
    },
    leclerc: {
      label: "Leclerc",
      color: "hsl(var(--chart-3))",
    },
    norris: {
      label: "Norris",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;
  


export function LineCard() {
  return (
    <Card className="h-[40vh] w-[80vh] flex flex-col items-center justify-between">  
      <CardContent className="h-[30vh] w-[70vh]">
        <ChartContainer config={chartConfig}>
        <LineChart
      accessibilityLayer
      data={chartData}
      margin={{
        left: 5,
        right: 5,
      }}
    >
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="race"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
      />
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      <Line
        dataKey="verstappen"
        type="monotone"
        stroke="var(--color-verstappen)"
        strokeWidth={2}
        dot={false}
      />
      <Line
        dataKey="hamilton"
        type="monotone"
        stroke="var(--color-hamilton)"
        strokeWidth={2}
        dot={false}
      />
      <Line
        dataKey="leclerc"
        type="monotone"
        stroke="var(--color-leclerc)"
        strokeWidth={2}
        dot={false}
      />
      <Line
        dataKey="norris"
        type="monotone"
        stroke="var(--color-norris)"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
