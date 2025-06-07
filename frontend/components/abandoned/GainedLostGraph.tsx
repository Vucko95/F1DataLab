import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer, } from 'recharts';

// Attach color to each driver
const data = [
  { driver_name: 'verstappen', gained: 4, lost: 0, color: '#82ca9d' },
  { driver_name: 'hamilton', gained: 0, lost: -3, color: '#8884d8' },
  { driver_name: 'leclerc', gained: 2, lost: 0, color: '#D92A3E' },
  { driver_name: 'perez', gained: 0, lost: -4, color: '#1E41FF' },
  { driver_name: 'russell', gained: 5, lost: 0, color: '#00D2BE' },
  { driver_name: 'sainz', gained: 0, lost: -2, color: '#D92A3E' },
  { driver_name: 'norris', gained: 3, lost: 0, color: '#FF8700' },
  { driver_name: 'alonso', gained: 0, lost: -1, color: '#006F62' },
  { driver_name: 'gasly', gained: 0, lost: -5, color: '#2173B8' },
  { driver_name: 'ocon', gained: 2, lost: 0, color: '#2173B8' },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/bar-chart-stacked-by-sign-k39xv3';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          stackOffset="sign"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="driver_name" />
          <YAxis
          
          />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          {/* Use `Cell` to apply color to individual bars */}
          <Bar dataKey="lost" stackId="stack">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
          <Bar dataKey="gained" stackId="stack">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
