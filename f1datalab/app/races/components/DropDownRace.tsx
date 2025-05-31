import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchRacesForSpecificYear, fetchRaceDetails } from "@/app/services/api";
import { useEffect, useState } from "react";

interface DropDownRaceProps {
  year: number;
  onRaceChange: (raceId: number) => void;
}

interface Races {
  raceId: number;
  name: string;
}

export function DropDownRace({ year, onRaceChange }: DropDownRaceProps) {
  const [races, setRaces] = useState<Races[]>([]);

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
    const selectedRace = races.find(race => race.name === value);
    if (selectedRace) {
      onRaceChange(selectedRace.raceId);
      console.log('value changed to ')
    }
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Race" />
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