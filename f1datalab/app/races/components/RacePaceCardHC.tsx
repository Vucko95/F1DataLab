import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

type DriverName = 'Hamilton' | 'Alonso' | 'Perez' | 'Max Verstappen' | 'Sainz' | 'Stroll' | 'Leclerc' | 'Norris' | 'Russell' | 'Piastri';

const data: { name: DriverName; best_lap: number; worst_lap: number; color: string }[] = [
  { name: 'Hamilton', best_lap: 947.22, worst_lap: 967.14, color: '#0af1e6' },
  { name: 'Alonso', best_lap: 941.55, worst_lap: 972.73, color: '#066945' },
  { name: 'Perez', best_lap: 943.64, worst_lap: 962.76, color: '#0a208d' },
  { name: 'Max Verstappen', best_lap: 926.08, worst_lap: 957.71, color: '#0a208d' },
  { name: 'Sainz', best_lap: 945.07, worst_lap: 962.21, color: '#FF0000' },
  { name: 'Stroll', best_lap: 956.32, worst_lap: 972.83, color: '#066945' },
  { name: 'Norris', best_lap: 944.76, worst_lap: 966.68, color: '#FF8000' },
  { name: 'Russell', best_lap: 950.65, worst_lap: 967.32, color: '#0af1e6' },
  { name: 'Piastri', best_lap: 947.74, worst_lap: 968.23, color: '#FF8000' }
];
const minLap = Math.min(...data.map(d => d.best_lap), ...data.map(d => d.worst_lap));
const maxLap = Math.max(...data.map(d => d.best_lap), ...data.map(d => d.worst_lap));

const normalizedData = data.map(d => ({
  ...d,
  best_lap: 1 + 9 * (d.best_lap - minLap) / (maxLap - minLap), 
  worst_lap: 1 + 9 * (d.worst_lap - minLap) / (maxLap - minLap),
}));

export function RacePaceCardHC() {
  return (
    <Card className="h-[44vh] w-[78vh] pr-8 pt-3 flex flex-col items-center justify-between ">
      <CardContent className="h-[44vh] w-[80vh] pt-4 ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={55}>
            <XAxis 
              axisLine={false} 
              tickLine={false} 
              dataKey="name"
              tickFormatter={(name) => name.slice(0, 3)} 
              tick={{ fontSize: 15, fontWeight: "bold", fill: "#888" }} 
            />
<YAxis
  domain={[92, 98]}  // Adjust this range to fit your data
/>
            <Bar dataKey="best_lap" stackId="stack" name="Start Average Position" radius={[5, 5, 5, 5]}>
              {data.map((entry, index) => (
                <Cell key={`cell-best-${index}`} stroke="black" strokeWidth={1} fill="transparent" />
              ))}
            </Bar>
            <Bar dataKey="worst_lap" stackId="stack" name="End Average Position" radius={[5, 5, 5, 5]}>
              {data.map((entry, index) => (
                <Cell key={`cell-worst-${index}`} stroke="black" strokeWidth={1} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
