import { Card, CardContent } from "@/components/ui/card";
import { RaceTable } from "./RaceTable";

interface RaceCardProps {
  raceId: number;
}

export function RaceCard({ raceId }: RaceCardProps) {
  return (
    <Card className="h-[44vh] w-[78vh]">
      <CardContent>
        <RaceTable raceId={raceId} />
      </CardContent>
    </Card>
  );
}
