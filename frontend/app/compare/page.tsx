import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function ComparePage() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-20  p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="max-w-md w-full text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
              <Wrench className="h-8 w-8" /> Compare Page
            </CardTitle>

          </CardHeader>
          <CardContent className="p-2">
            <p className="text-xl text-foreground/80 mb-4">
              This page is currently under construction and not yet available.
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}











//  COMMENT OUT COMPARE LOGIC
// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { DropDown } from "@/app/races/components/DropDown";
// import { ModeToggle } from "@/components/ui/ModeToggle";

// interface DriverStats {
//   wins: number;
//   poles: number;
//   podiums: number;
//   fastestLaps: number;
//   championships: number;
//   dnfs: number;
//   avgGridPos: number;
//   avgRacePos: number;
//   points: number;
// }

// interface DriversByYear {
//   [driverName: string]: DriverStats;
// }

// interface F1DataByYear {
//   [year: number]: DriversByYear;
// }

// const driversDataByYear: F1DataByYear = {
//   2024: {
//     "Max Verstappen": {
//       wins: 5,
//       poles: 4,
//       podiums: 6,
//       fastestLaps: 2,
//       championships: 0,
//       dnfs: 1,
//       avgGridPos: 2.1,
//       avgRacePos: 1.8,
//       points: 150,
//     },
//     "Charles Leclerc": {
//       wins: 1,
//       poles: 2,
//       podiums: 4,
//       fastestLaps: 1,
//       championships: 0,
//       dnfs: 0,
//       avgGridPos: 3.5,
//       avgRacePos: 3.2,
//       points: 120,
//     },
//     "Lando Norris": {
//       wins: 1,
//       poles: 0,
//       podiums: 3,
//       fastestLaps: 1,
//       championships: 0,
//       dnfs: 0,
//       avgGridPos: 4.0,
//       avgRacePos: 3.5,
//       points: 105,
//     },
//     "Lewis Hamilton": {
//         wins: 0,
//         poles: 0,
//         podiums: 1,
//         fastestLaps: 0,
//         championships: 0,
//         dnfs: 0,
//         avgGridPos: 7.2,
//         avgRacePos: 6.8,
//         points: 80,
//     },
//   },
//   2021: {
//     "Max Verstappen": {
//       wins: 10,
//       poles: 10,
//       podiums: 18,
//       fastestLaps: 6,
//       championships: 1,
//       dnfs: 2,
//       avgGridPos: 1.5,
//       avgRacePos: 1.2,
//       points: 395.5,
//     },
//     "Lewis Hamilton": {
//       wins: 8,
//       poles: 5,
//       podiums: 17,
//       fastestLaps: 6,
//       championships: 0,
//       dnfs: 0,
//       avgGridPos: 1.5,
//       avgRacePos: 1.5,
//       points: 387.5,
//     },
//     "Valtteri Bottas": {
//       wins: 1,
//       poles: 4,
//       podiums: 11,
//       fastestLaps: 4,
//       championships: 0,
//       dnfs: 3,
//       avgGridPos: 3.5,
//       avgRacePos: 3.5,
//       points: 226,
//     },
//     "Sergio Perez": {
//       wins: 1,
//       poles: 0,
//       podiums: 5,
//       fastestLaps: 2,
//       championships: 0,
//       dnfs: 1,
//       avgGridPos: 6.5,
//       avgRacePos: 4.5,
//       points: 190,
//     },
//   },
//   2020: {
//     "Lewis Hamilton": {
//       wins: 11,
//       poles: 10,
//       podiums: 14,
//       fastestLaps: 6,
//       championships: 1,
//       dnfs: 0,
//       avgGridPos: 1.1,
//       avgRacePos: 1.2,
//       points: 347,
//     },
//     "Valtteri Bottas": {
//       wins: 2,
//       poles: 5,
//       podiums: 11,
//       fastestLaps: 2,
//       championships: 0,
//       dnfs: 0,
//       avgGridPos: 2.1,
//       avgRacePos: 2.5,
//       points: 223,
//     },
//     "Max Verstappen": {
//       wins: 2,
//       poles: 1,
//       podiums: 11,
//       fastestLaps: 3,
//       championships: 0,
//       dnfs: 5,
//       avgGridPos: 3.1,
//       avgRacePos: 3.0,
//       points: 189,
//     },
//     "Daniel Ricciardo": {
//         wins: 0,
//         poles: 0,
//         podiums: 2,
//         fastestLaps: 1,
//         championships: 0,
//         dnfs: 0,
//         avgGridPos: 8.5,
//         avgRacePos: 5.5,
//         points: 119,
//     }
//   },
// };

// export default function ComparePage() {
//   const [selectedYear, setSelectedYear] = useState<number>(2024);
//   const [selectedDriver1, setSelectedDriver1] = useState<string | null>(null);
//   const [selectedDriver2, setSelectedDriver2] = useState<string | null>(null);

//   // Type assertion here to tell TypeScript that selectedYear will be a valid key
//   // because we control `driversDataByYear` and `selectedYear` state.
//   const availableDriversForYear = Object.keys(driversDataByYear[selectedYear as keyof typeof driversDataByYear] || {});

//   useEffect(() => {
//     const yearHasData = driversDataByYear[selectedYear as keyof typeof driversDataByYear];

//     if (yearHasData && availableDriversForYear.length > 0) {
//       // If selectedDriver1 is null or not in the current year's drivers, set to first available
//       if (!selectedDriver1 || !availableDriversForYear.includes(selectedDriver1)) {
//         setSelectedDriver1(availableDriversForYear[0]);
//       }
//       // If selectedDriver2 is null or not in the current year's drivers or is same as driver1,
//       // try to set to the next available driver.
//       if (!selectedDriver2 || !availableDriversForYear.includes(selectedDriver2) || selectedDriver2 === selectedDriver1) {
//         const defaultDriver2 = availableDriversForYear.find(driver => driver !== availableDriversForYear[0]);
//         setSelectedDriver2(defaultDriver2 || null);
//       }
//     } else {
//       // If no data for the year, clear selections
//       setSelectedDriver1(null);
//       setSelectedDriver2(null);
//     }
//   }, [selectedYear, availableDriversForYear, selectedDriver1, selectedDriver2]); // Add selectedDriver1, selectedDriver2 to deps

//   // Use optional chaining (`?.`) and nullish coalescing (`??`) for safe access
//   const driver1Stats = selectedDriver1
//     ? driversDataByYear[selectedYear as keyof typeof driversDataByYear]?.[selectedDriver1]
//     : null;
//   const driver2Stats = selectedDriver2
//     ? driversDataByYear[selectedYear as keyof typeof driversDataByYear]?.[selectedDriver2]
//     : null;

//   return (
//     <div className="p-4 pl-8">
//       <ModeToggle />

//       <div className="max-w-[90%] mx-auto pt-4">
//         <h1 className="text-4xl font-bold text-center mb-2">Driver vs. Driver Comparison</h1>
//         <p className="text-lg text-center text-muted-foreground mb-8">
//           Uncover seasonal performance differences between two drivers with interactive graphs and key statistics.
//         </p>

//         <div className="flex justify-center mb-8">
//             <DropDown onYearChange={setSelectedYear} />
//         </div>

//         <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
//           <div className="w-full md:w-1/3">
//             <Select onValueChange={setSelectedDriver1} value={selectedDriver1 || ""}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select Driver 1" />
//               </SelectTrigger>
//               <SelectContent>
//                 {availableDriversForYear.map((driverName) => (
//                   <SelectItem key={driverName} value={driverName}>
//                     {driverName}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <span className="text-xl font-semibold text-muted-foreground">VS.</span>

//           <div className="w-full md:w-1/3">
//             <Select onValueChange={setSelectedDriver2} value={selectedDriver2 || ""}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select Driver 2" />
//               </SelectTrigger>
//               <SelectContent>
//                 {availableDriversForYear.map((driverName) => (
//                   <SelectItem key={driverName} value={driverName}>
//                     {driverName}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <Card>
//             <CardHeader>
//               <CardTitle>{selectedDriver1 || "Driver 1"}</CardTitle>
//               <CardDescription>Performance in {selectedYear}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {driver1Stats ? (
//                 <div className="space-y-6">
//                   <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-muted-foreground border border-dashed">
//                     [Graph Placeholder for {selectedDriver1}]
//                   </div>
//                   <CardDescription className="text-center">
//                     (e.g., Lap Time Distribution, Race Position Progression)
//                   </CardDescription>

//                   <div>
//                     <h3 className="text-lg font-semibold mb-3">Key Season Highlights</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-muted p-4 rounded-md flex flex-col items-center justify-center">
//                         <span className="text-sm text-muted-foreground">Wins</span>
//                         <span className="text-3xl font-extrabold text-primary">{driver1Stats.wins}</span>
//                       </div>
//                       <div className="bg-muted p-4 rounded-md flex flex-col items-center justify-center">
//                         <span className="text-sm text-muted-foreground">Poles</span>
//                         <span className="text-3xl font-extrabold text-primary">{driver1Stats.poles}</span>
//                       </div>
//                       <div className="bg-muted p-4 rounded-md flex flex-col items-center justify-center">
//                         <span className="text-sm text-muted-foreground">Podiums</span>
//                         <span className="text-3xl font-extrabold text-primary">{driver1Stats.podiums}</span>
//                       </div>
//                       <div className="bg-muted p-4 rounded-md flex flex-col items-center justify-center">
//                         <span className="text-sm text-muted-foreground">Championships</span>
//                         <span className="text-3xl font-extrabold text-primary">{driver1Stats.championships}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold mb-3">Detailed Season Stats</h3>
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center p-2 border-b border-border">
//                         <span className="font-medium">Fastest Laps:</span>
//                         <span className="font-semibold">{driver1Stats.fastestLaps}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2 border-b border-border">
//                         <span className="font-medium">DNFs:</span>
//                         <span className="font-semibold">{driver1Stats.dnfs}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2 border-b border-border">
//                         <span className="font-medium">Avg. Grid Pos.:</span>
//                         <span className="font-semibold">{driver1Stats.avgGridPos.toFixed(1)}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2 border-b border-border">
//                         <span className="font-medium">Avg. Race Pos.:</span>
//                         <span className="font-semibold">{driver1Stats.avgRacePos.toFixed(1)}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2">
//                         <span className="font-medium">Total Points:</span>
//                         <span className="font-semibold">{driver1Stats.points}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-muted-foreground text-center py-4">Select Driver 1 to see comparison insights.</p>
//               )}
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>{selectedDriver2 || "Driver 2"}</CardTitle>
//               <CardDescription>Performance in {selectedYear}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {driver2Stats ? (
//                 <div className="space-y-6">
//                   <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-muted-foreground border border-dashed">
//                     [Graph Placeholder for {selectedDriver2}]
//                   </div>
//                   <CardDescription className="text-center">
//                     (e.g., Lap Time Distribution, Race Position Progression)
//                   </CardDescription>

//                   <div>
//                     <h3 className="text-lg font-semibold mb-3">Key Season Highlights</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-muted p-4 rounded-md flex flex-col items-center justify-center">
//                         <span className="text-sm text-muted-foreground">Wins</span>
//                         <span className="text-3xl font-extrabold text-primary">{driver2Stats.wins}</span>
//                       </div>
//                       <div className="bg-muted p-4 rounded-md flex flex-col items-center justify-center">
//                         <span className="text-sm text-muted-foreground">Poles</span>
//                         <span className="text-3xl font-extrabold text-primary">{driver2Stats.poles}</span>
//                       </div>
//                       <div className="bg-muted p-4 rounded-md flex flex-col items-center justify-center">
//                         <span className="text-sm text-muted-foreground">Podiums</span>
//                         <span className="text-3xl font-extrabold text-primary">{driver2Stats.podiums}</span>
//                       </div>
//                       <div className="bg-muted p-4 rounded-md flex flex-col items-center justify-center">
//                         <span className="text-sm text-muted-foreground">Championships</span>
//                         <span className="text-3xl font-extrabold text-primary">{driver2Stats.championships}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold mb-3">Detailed Season Stats</h3>
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center p-2 border-b border-border">
//                         <span className="font-medium">Fastest Laps:</span>
//                         <span className="font-semibold">{driver2Stats.fastestLaps}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2 border-b border-border">
//                         <span className="font-medium">DNFs:</span>
//                         <span className="font-semibold">{driver2Stats.dnfs}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2 border-b border-border">
//                         <span className="font-medium">Avg. Grid Pos.:</span>
//                         <span className="font-semibold">{driver2Stats.avgGridPos.toFixed(1)}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2 border-b border-border">
//                         <span className="font-medium">Avg. Race Pos.:</span>
//                         <span className="font-semibold">{driver2Stats.avgRacePos.toFixed(1)}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2">
//                         <span className="font-medium">Total Points:</span>
//                         <span className="font-semibold">{driver2Stats.points}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-muted-foreground text-center py-4">Select Driver 2 to see comparison insights.</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }