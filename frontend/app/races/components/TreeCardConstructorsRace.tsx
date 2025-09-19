"use client"
import { Treemap , ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import { fetchRaceTreemap } from "@/app/services/api";
import { Card, CardContent, CardHeader, } from "@/components/ui/card"

interface TreeGraphProps {
  raceId: number;
}

interface ConstructorStandingTree {
  constructor_name: string;
  constructorId: number;
  points: number;
  color: string;
}


export function TreeCardConstructorsRace({ raceId }: TreeGraphProps) {
  const [constructors, setConstructors] = useState<ConstructorStandingTree[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ConstructorStandingTree[] = await fetchRaceTreemap(raceId);
        setConstructors(data);
        console.log("Fetched constructor data:", data);

      } catch (error) {
        console.error("Error fetching driver standings:", error);
      }
    };
    fetchData();
  }, [raceId]);

  const transformedData = constructors.map(constructor => ({
    name: constructor.constructor_name,
    size: constructor.points,
    fill: constructor.color,
  }));


  return (
    <Card className="h-[44vh] md:h-[58.6vh] w-full max-w-[78vh] flex flex-col items-center justify-between">
      <CardHeader className="absolute">
        <h1 className="text-xl  text-primary mb-2 font-mono ">Driver Points Full Season</h1>
      </CardHeader>
      <CardContent className="pt-14 w-full h-full">
        <ResponsiveContainer>
          <Treemap data={transformedData} dataKey="size" stroke="#000000" fill="#000000"/>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


