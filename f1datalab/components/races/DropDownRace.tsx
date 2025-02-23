import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchRacesForSpecificYear } from "@/app/services/api";
import { useEffect, useState } from "react";

interface YearChangeProps {
  year: number;
}

interface Races {
  raceId: number;
  name: string;
}

export function DropDownRace({ year }: YearChangeProps) {
  const [races, setRaces] = useState<Races[]>([]);
  const [selectedRace, setSelectedRace] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Races[] = await fetchRacesForSpecificYear(year);
        setRaces(data);
      } catch (error) {
        console.error("Error fetching races:", error);
      }
    };

    fetchData();
  }, [year]);

  const handleValueChange = (value: string) => {
    setSelectedRace(value);
    console.log("Selected Race:", value);
  };

  return (
    <Select onValueChange={handleValueChange} value={selectedRace}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Race" />
      </SelectTrigger>
      <SelectContent>
        {races.length > 0 ? (
          races.map((race) => (
            <SelectItem key={race.raceId} value={race.name}>
              {race.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="none" disabled>
            No races available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
