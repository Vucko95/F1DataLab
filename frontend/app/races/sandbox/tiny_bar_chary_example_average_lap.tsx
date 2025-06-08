import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Helper function to format milliseconds into a human-readable time (MM:SS.mmm)
const formatMillisecondsToTime = (milliseconds) => {
  if (milliseconds === null || isNaN(milliseconds)) return "N/A";
  const totalSeconds = milliseconds / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toFixed(0).padStart(2, '0')}:${seconds.toFixed(3).padStart(6, '0')}`;
};

const data = [
  { driverName: 'Max Verstappen', averageMilliseconds: 78500 }, // 1:18.500
  { driverName: 'Charles Leclerc', averageMilliseconds: 78950 }, // 1:18.950
  { driverName: 'Lewis Hamilton', averageMilliseconds: 79200 }, // 1:19.200
  { driverName: 'George Russell', averageMilliseconds: 79350 }, // 1:19.350
  { driverName: 'Sergio Perez', averageMilliseconds: 79800 }, // 1:19.800
  { driverName: 'Carlos Sainz', averageMilliseconds: 80100 }, // 1:20.100
  { driverName: 'Fernando Alonso', averageMilliseconds: 80550 }, // 1:20.550
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/tiny-bar-chart-xzyy8g';

  render() {
    // Determine the minimum and maximum values for your data to set the X-axis domain
    const minLapTime = Math.min(...data.map(d => d.averageMilliseconds));
    const maxLapTime = Math.max(...data.map(d => d.averageMilliseconds));

    // Calculate a good starting point for the X-axis.
    // We'll start slightly below the fastest average lap time to "zoom in".
    // For example, 1000 milliseconds (1 second) before the fastest lap.
    // Or, you can make it dynamic based on the range of the data.
    const xDomainStart = minLapTime - 500; // Subtract 0.5 seconds for a bit of padding
    const xDomainEnd = maxLapTime + 200; // Add 0.2 seconds for a bit of padding at the end

    return (
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              dataKey="averageMilliseconds"
              tickFormatter={formatMillisecondsToTime}
              label={{ value: "Average Lap Time", position: "insideBottom", offset: 0, dy: 10 }}
              // --- KEY CHANGE HERE ---
              domain={[xDomainStart, xDomainEnd]} // Set the explicit domain for X-axis
              // --- END KEY CHANGE ---
            />
            <YAxis
              type="category"
              dataKey="driverName"
              width={120}
              label={{ value: "Driver", angle: -90, position: "insideLeft", dx: -20 }}
            />
            <Tooltip
              formatter={(value) => `${formatMillisecondsToTime(value)}`}
              labelFormatter={(label) => `Driver: ${label}`}
            />
            <Bar
              dataKey="averageMilliseconds"
              fill="#8884d8"
              barSize={25}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}