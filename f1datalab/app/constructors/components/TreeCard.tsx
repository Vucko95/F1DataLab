"use client"
import { Treemap , ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import { fetchConstructorStandingsYearTree } from "@/app/services/api";
import { Card, CardContent, CardHeader, } from "@/components/ui/card"

interface TreeGraphProps {
  year: number;
}

interface ConstructorStandingTree {
  constructor_name: string;
  constructorId: number;
  total_points: number;
  color: string;
}


export function TreeCard({ year }: TreeGraphProps) {
  const [constructors, setConstructors] = useState<ConstructorStandingTree[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ConstructorStandingTree[] = await fetchConstructorStandingsYearTree(year);
        setConstructors(data);
      } catch (error) {
        console.error("Error fetching driver standings:", error);
      }
    };
    fetchData();
  }, [year]);

  const transformedData = constructors.map(constructor => ({
    name: constructor.constructor_name,
    size: constructor.total_points,
    fill: constructor.color,
  }));


  return (
    <Card className="h-[44vh] w-full max-w-[78vh] flex flex-col items-center justify-between">
      <CardHeader className="absolute">
        <h1 className="text-lg">Constructor Points Full Season TreeMap</h1>
      </CardHeader>

      <CardContent className="pt-14 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap data={transformedData} dataKey="size" stroke="#000000" fill="#000000"/>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


