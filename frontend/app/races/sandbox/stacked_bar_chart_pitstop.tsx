import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Helper function to format milliseconds to a human-readable time (seconds with decimals)
const formatMillisecondsToSeconds = (milliseconds) => {
  if (milliseconds === null || isNaN(milliseconds)) return "N/A";
  return (milliseconds / 1000).toFixed(2); // Convert to seconds, 2 decimal places
};

// Hardcoded data for pit stops for 5 drivers (assuming 3 pit stops each)
const driverPitStopData = [
  {
    driverId: "830",
    pitStop1: 2200,
    pitStop3: 2300,
  },
  {
    driverId: "21",
    pitStop1: 2400,
    pitStop2: 2600,
    pitStop3: 2500,
  },
  {
    driver: "Lewis Hamilton",
    pitStop1: 2300,
    pitStop2: 2700,
    pitStop3: 2400,
  },
  {
    driver: "Sergio Perez",
    pitStop1: 2500,
    pitStop2: 2800,
    pitStop3: 2600,
  },
  {
    driver: "Lando Norris",
    pitStop1: 2100,
    pitStop2: 2400,
    pitStop3: 2200,
  },
];

export default class PitStopChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/stacked-bar-chart-7fwfgj'; // Reference URL

  render() {
    return (
      <div style={{ width: '100%', height: 400 }}> {/* Set a height for the container */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={driverPitStopData} // Use our hardcoded pit stop data
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="driver" /> {/* X-axis displays driver names */}
            <YAxis
              tickFormatter={formatMillisecondsToSeconds} // Format Y-axis ticks to seconds
              label={{ value: 'Total Pit Stop Time (s)', angle: -90, position: 'insideLeft' }} // Label for Y-axis
            />
            <Tooltip
              formatter={(value, name, props) => {
                // Custom formatter for tooltip to show time in seconds and rename dataKey
                if (name.startsWith('pitStop')) {
                  const pitStopNumber = name.replace('pitStop', 'Pit Stop ');
                  return [`${formatMillisecondsToSeconds(value)} s`, pitStopNumber];
                }
                return [value, name];
              }}
              // Optional: Custom label formatter for tooltip
              labelFormatter={(label) => `Driver: ${label}`}
            />
            <Legend />
            {/* Stacked Bars for each pit stop, with different colors */}
            <Bar dataKey="pitStop1" stackId="totalPitTime" fill="#FF8700" name="Pit Stop 1" /> {/* McLaren Orange for 1st stop */}
            <Bar dataKey="pitStop2" stackId="totalPitTime" fill="#00D2BE" name="Pit Stop 2" /> {/* Mercedes Teal for 2nd stop */}
            <Bar dataKey="pitStop3" stackId="totalPitTime" fill="#E8002D" name="Pit Stop 3" /> {/* Ferrari Red for 3rd stop */}
            {/* Add more Bar components here if drivers have more pit stops */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}