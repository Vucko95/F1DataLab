import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { DriversTable } from "./DriversTable";


export function TableCard() {
  return (
    <Card className="h-[40vh] w-[80vh] p-4 flex flex-col items-center justify-between">
      <CardContent>
        <DriversTable />
      </CardContent>
    </Card>
  );

}
