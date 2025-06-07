import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function DriverCard() {
    return (

<Card className="h-[40vh] w-[80vh] p-4 flex flex-col items-center justify-between">

  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card</p>
  </CardContent>
  {/* <CardFooter>
    <p>Card Footer</p>
  </CardFooter> */}
</Card>

    );
  }