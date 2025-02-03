import { Card, CardContent } from "@/components/ui/card";
import { DriversTable } from "./DriversTable";

interface TableCardProps {
  year: number;
}

export function TableCard({ year }: TableCardProps) {
  return (
    <Card className="h-[40vh] w-[80vh]">
      <CardContent>
        <DriversTable year={year} />
      </CardContent>
    </Card>
  );
}
