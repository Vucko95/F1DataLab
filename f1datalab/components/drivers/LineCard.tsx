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
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig

const chartData = [
    { race: "Race 1", verstappen: 0, hamilton: 0, leclerc: 0, norris: 0 },
    { race: "Race 2", verstappen: 50, hamilton: 40, leclerc: 45, norris: 35 },
    { race: "Race 3", verstappen: 90, hamilton: 85, leclerc: 80, norris: 95 }, // Norris jumps ahead
    { race: "Race 4", verstappen: 130, hamilton: 140, leclerc: 120, norris: 110 }, // Hamilton takes the lead
    { race: "Race 5", verstappen: 170, hamilton: 180, leclerc: 175, norris: 160 }, // Close battle between Hamilton & Leclerc
    { race: "Race 6", verstappen: 220, hamilton: 200, leclerc: 230, norris: 190 }, // Leclerc wins overall
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
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
          </div>
        </div>
      </CardFooter> */}
    </Card>
  )
}
