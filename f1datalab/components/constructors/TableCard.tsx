import { Card, CardContent } from "@/components/ui/card";
import { ConstructorsTable } from "./ConstructorsTable";

interface TableCardProps {
  year: number;
}

export function TableCard({ year }: TableCardProps) {
  return (
    <Card className="h-[44vh] w-[78vh]">
      <CardContent>
        <ConstructorsTable year={year} />
      </CardContent>
    </Card>
  );
}
