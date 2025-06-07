import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ChartCardProps {
  children: React.ReactNode;
}

export function ChartCard({ children }: ChartCardProps) {
  return (
    <Card className="h-[40vh] w-[80vh] flex flex-col items-center justify-between">
      <CardContent className="h-[30vh] w-[70vh]">{children}</CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2"></div>
        </div>
      </CardFooter>
    </Card>
  );
}
