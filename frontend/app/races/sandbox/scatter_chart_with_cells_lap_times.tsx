// https://recharts.org/en-US/examples/ScatterChartWithCells

import React, { PureComponent } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell, // <--- Make sure Cell is imported here!
  // Legend // No longer strictly needed as colors are directly on points, but could be used for custom legends
} from 'recharts';

// Helper function to format milliseconds into a human-readable time (MM:SS.mmm)
const formatMillisecondsToTime = (milliseconds) => {
  if (milliseconds === null || isNaN(milliseconds)) return "N/A";
  const totalSeconds = milliseconds / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toFixed(0).padStart(2, '0')}:${seconds.toFixed(3).padStart(6, '0')}`;
};

// Function to generate synthetic lap times for a driver
const generateLapTimes = (startLap, endLap, baseTimeMs, variationMs, slowLapInterval = -1) => {
  const lapTimes = [];
  for (let lap = startLap; lap <= endLap; lap++) {
    let time = baseTimeMs + (Math.random() - 0.5) * variationMs * 2; // Random variation

    // Simulate occasional slower laps (e.g., traffic, tire deg) - kept this, but no pit stops
    if (slowLapInterval > 0 && lap % slowLapInterval === 0 && lap > startLap) {
        time += Math.random() * 800 + 300; // Add 0.3-1.1 seconds for a "slower lap"
    }
    lapTimes.push({ lap, time: Math.round(time) });
  }
  return lapTimes;
};


// Hardcoded data for 5 drivers' lap times (60 laps each)
const driverLapDataRaw = [
  {
    name: "Max Verstappen",
    color: "#0600EF", // Red Bull Blue
    times: generateLapTimes(1, 60, 81000, 300, 10), // Base 1:21.000, +/- 0.3s, slightly slower every 10 laps
  },
  {
    name: "Charles Leclerc",
    color: "#E8002D", // Ferrari Red
    times: generateLapTimes(1, 60, 81500, 350, 15), // Base 1:21.500, +/- 0.35s, slightly slower every 15 laps
  },
  {
    name: "Lewis Hamilton",
    color: "#00D2BE", // Mercedes Teal
    times: generateLapTimes(1, 60, 81700, 400, 8), // Base 1:21.700, +/- 0.4s, slightly slower every 8 laps
  },
  {
    name: "Sergio Perez",
    color: "#4682B4", // SteelBlue - a distinct shade for Perez from Max
    times: generateLapTimes(1, 60, 82200, 450, 12), // Base 1:22.200, +/- 0.45s, slightly slower every 12 laps
  },
  {
    name: "Lando Norris",
    color: "#FF8700", // McLaren Orange
    times: generateLapTimes(1, 60, 82000, 380, 7), // Base 1:22.000, +/- 0.38s, slightly slower every 7 laps
  },
];

// IMPORTANT: Transform the data structure for the chart layout
const combinedLapTimesForDriversXAxis = driverLapDataRaw.flatMap(driver =>
    driver.times.map(lapInfo => ({
        driverName: driver.name,
        time: lapInfo.time,
        lap: lapInfo.lap, // Keep lap info for tooltip
        color: driver.color // Pass the driver's specific color
    }))
);

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/scatter-chart-with-double-yaxes-3yzqtm';

  render() {
    // Determine the min/max lap times (milliseconds) for the Y-axis
    const allTimes = combinedLapTimesForDriversXAxis.map(d => d.time);
    const minTime = Math.min(...allTimes);
    const maxTime = Math.max(...allTimes);

    // Set a "zoomed in" domain for the Y-axis now that pit stops are removed.
    // We can make the zoom much tighter.
    const yDomainStart = minTime - 300; // Small padding below the lowest lap time
    const yDomainEnd = maxTime + 300;   // Small padding above the highest lap time


    return (
      <div style={{ width: '100%', height: 500 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* X-Axis: Drivers (Categorical) */}
            <XAxis
              type="category"
              dataKey="driverName"
              name="Driver"
              tickLine={false}
              padding={{ left: 20, right: 20 }}
            />
            {/* Y-Axis: Lap Time (Numerical) */}
            <YAxis
              type="number"
              dataKey="time"
              name="Lap Time"
              unit=""
              tickFormatter={formatMillisecondsToTime}
              domain={[yDomainStart, yDomainEnd]}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name, props) => {
                if (name === 'time') {
                  return [`Time: ${formatMillisecondsToTime(value)}`, `Lap ${props.payload.lap}`];
                }
                return [value, name];
              }}
              labelFormatter={(label) => `Driver: ${label}`}
            />
            {/* --- FIX BASED ON YOUR REFERENCE EXAMPLE --- */}
            <Scatter
              name="Lap Times"
              data={combinedLapTimesForDriversXAxis} // Data array goes here
              // *** Removed fill, shape, and dot from Scatter as Cell will handle it ***
            >
              {/* Map over the data array to render a Cell for each data point */}
              {combinedLapTimesForDriversXAxis.map((entry, index) => (
                <Cell
                  key={`cell-${entry.driverName}-${index}`} // Unique key for each cell
                  fill={entry.color} // Use the color from our data object
                  // You can also add other SVG properties here if needed, like r for radius
                  // r={2} // Example: Set radius if needed, or let Recharts default
                />
              ))}
            </Scatter>
            {/* --- END FIX --- */}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }
}