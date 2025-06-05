"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { CircuitBoard, TrendingUp } from "lucide-react";

export default function Home() {

  return (
    <div className="p-4 pl-8"> 
      <ModeToggle /> 
      <div className="pt-4 max-w-[90%] mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-4 text-primary">Formula 1 DataLab</h1>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CircuitBoard className="h-6 w-6 text-orange-500" /> Qualifying vs. Race Day Gains
              </CardTitle>
              <CardDescription>Historical position changes from start to finish</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold mb-2">Top Gainers & Losers</p>
              <p className="text-muted-foreground">
                Delve into which drivers historically gained the most positions on race day, and conversely, who struggled to maintain their grid slots. Analyze trends across different circuits and eras.
              </p>
              <div className="bg-muted h-40 flex items-center justify-center rounded-lg mt-4 border border-dashed">
                <p className="text-muted-foreground text-sm">Race Day Position Change Chart Placeholder</p>
              </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-500" /> Constructor Reliability & Pace Trends
              </CardTitle>
              <CardDescription>Team performance over time, including DNFs and points finishes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold mb-2">Team Consistency Score</p>
              <p className="text-muted-foreground">
                Examine constructor evolution. Identify periods of dominance, technical reliability, and how team strategies impacted overall points acquisition across seasons.
              </p>
              <div className="bg-muted h-40 flex items-center justify-center rounded-lg mt-4 border border-dashed">
                <p className="text-muted-foreground text-sm">Constructor Performance Chart Placeholder</p>
              </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-6">Dive Deeper into F1 Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button size="lg" variant="outline" className="px-8 py-4 h-auto">Driver Head-to-Head Comparisons</Button>
            <Button size="lg" variant="outline" className="px-8 py-4 h-auto">Circuit Analysis & Records</Button>
            <Button size="lg" variant="outline" className="px-8 py-4 h-auto">DNF Causes & Trends</Button>
            <Button size="lg" variant="outline" className="px-8 py-4 h-auto">Lap Time & Sector Data</Button>
            <Button size="lg" variant="outline" className="px-8 py-4 h-auto">Historical Pole Position Analysis</Button>
            <Button size="lg" variant="outline" className="px-8 py-4 h-auto">Tyre Strategy Impact (Historical)</Button>
          </div>
        </section>

      </div> 
    </div>
  );
}