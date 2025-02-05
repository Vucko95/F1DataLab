import { Card, CardContent } from "@/components/ui/card";
import { DriversTable } from "./DriversTable";

interface TableCardProps {
  year: number;
}

export function TableCard({ year }: TableCardProps) {
  return (
    <Card className="h-[44vh] w-[78vh]">
      <CardContent>
        <DriversTable year={year} />
      </CardContent>
    </Card>
  );
}
