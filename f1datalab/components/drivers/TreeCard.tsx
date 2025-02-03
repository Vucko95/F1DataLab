"use client"
import { Treemap } from 'recharts';
import { useEffect, useState } from "react";
import { fetchDriverStandingsYearTree } from "@/app/services/api";
import {
  Card,
  CardContent,
} from "@/components/ui/card"

interface TreeGraphProps {
  year: number;
}

interface DriverStandingTree {
  driverId: number;
  raceId: number;
  constructorId: number;
  forename: string;
  surname: string;
  nationality: string;
  total_points: number;
  color: string;
}


// const data = [
//   { name: 'Verstappen', size: 11138, fill: '#1E41FF' },
//   { name: 'Perez', size: 10200, fill: '#1E41FF' },
//   { name: 'Leclerc', size: 20544, fill: '#DC0000' },
//   { name: 'Sainz', size: 19322, fill: '#DC0000' },
//   { name: 'Hamilton', size: 17340, fill: '#00D2BE' },
//   { name: 'Russell', size: 15243, fill: '#00D2BE' },
//   { name: 'Norris', size: 12000, fill: '#FF8700' },
//   { name: 'Piastri', size: 11500, fill: '#FF8700' },
//   { name: 'Alonso', size: 15000, fill: '#006F62' },
//   { name: 'Stroll', size: 8000, fill: '#006F62' },
//   { name: 'Gasly', size: 10000, fill: '#0090FF' },
//   { name: 'Ocon', size: 9500, fill: '#0090FF' },
//   { name: 'Albon', size: 7500, fill: '#005AFF' }
// ];

export function TreeCard({ year }: TreeGraphProps) {
  const [drivers, setDrivers2] = useState<DriverStandingTree[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: DriverStandingTree[] = await fetchDriverStandingsYearTree(year);
        setDrivers2(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching driver standings:", error);
      }
    };
    // ADDING Mount due the hydration erros , which happens due the missmatch on server and client sidde.
    if (isMounted) {
      fetchData(); // fetch  data only after the component has mounted.
    }
  }, [year, isMounted]); // re-fetch data whenever year changes

  if (!isMounted) {
    return null; // render nothing on the server
  }

  const transformedData = drivers.map(driver => ({
    name: driver.forename,
    size: driver.total_points,
    fill: driver.color,
  }));


  return (
    <Card className="h-[40vh] w-[78vh] flex flex-col items-center justify-between">
      <CardContent className="p-5   ">
        <Treemap
          width={700}
          height={350}
          data={transformedData}
          dataKey="size"
          stroke="#000000"
          fill="#000000"
        />
      </CardContent>
    </Card>
  )
}


