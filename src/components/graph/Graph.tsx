// // import * as React from 'react';
// // import { LineChart } from '@mui/x-charts/LineChart';

// // export default function BasicLineChart() {
// //   return (
// //     <LineChart
// //       xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
// //       series={[
// //         {
// //           data: [2, 5.5, 2, 8.5, 1.5, 5],
// //         },
// //       ]}
// //       width={500}
// //       height={300}
// //     />
// //   );
// // }

// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import * as faker from '@faker-js/faker';
// import { color } from 'framer-motion';
// import Background from '../taskBackground/Background';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//       labels: {
//         color: 'white' // Set legend label color to white
//       }
//     },
    
 
//   },
//   color:'#ffffff'
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
  
//   datasets: [
//     {
//       label: 'User Rank',
//       data: labels.map(() =>faker.faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 0, 162)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       color:'#ffffff',
    
//     },
    
//   ],
// };

// export function Graph() {
//   return <Line options={options} data={data} />;
// }

import * as React from 'react';
import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const labels: string[] = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E'];
const lData: number[] = [42, 24, 56, 45, 3];
const rData: number[] = [57, 7, 19, 16, 22];
const colors: string[] = [ '#ffff','#ff006a'];

export default function Graph(): React.JSX.Element {
  return (
    <BarChart
      sx={(theme) => ({
        [`.${barElementClasses.root}`]: {
          fill: '#ff006a',
          strokeWidth: 2,
        },
        
        [`.MuiChartsLegend-mark`]: {
          
          display:'none'
        },
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: '#ffff',
            strokeWidth: 3,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: '#ffff',
          },
        },

        border: `1px solid rgba(${theme.palette.mode === 'dark' ? '255,255,255' : '0, 0, 0'}, 0.1)`,
        // backgroundImage: `linear-gradient(rgba(${theme.palette.mode === 'dark' ? '255,255,255' : '0, 0, 0'}, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(${theme.palette.mode === 'dark' ? '255,255,255' : '0, 0, 0'}, 0.1) 1px, transparent 1px)`,
        // backgroundSize: '35px 35px',
        backgroundPosition: '20px 20px, 20px 20px',
      })}
      xAxis={[{ scaleType: 'band', data: labels }]}
      series={[
        // { data: lData, label: 'l', id: 'l_id' },
        { data: rData, label: 'r', id: 'r_id' },
      ]}
      colors={colors}
      width={1000}
      height={400}
    />
  );
}
