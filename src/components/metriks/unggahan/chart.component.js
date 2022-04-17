import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import classes from './styles.module.css';
import '../../../index.css';
import {
  Box,
} from "@mui/material";
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({title, sourceData}) => {

    const statusOptions = {
      responsive: true,
      plugins: {
      legend: {
          display: false,
          position: 'top',
      },
      title: {
          display: false,
      },
      maintainAspectRatio: false
      },
    };

    const data = {
      labels: sourceData.labels,
      datasets: [
          {
              data: sourceData.chartData,
              backgroundColor: ['rgba(226, 162, 85, 1)', 'rgba(88, 146, 156, 1)', 'rgba(210, 105, 48, 1)', 'rgba(131, 159, 88, 1)']

          }
      ]
    };

    return (
      <Box py={4} pl={4} pr={12} className={classes.metricsCard}>
          <p className="text-bold-title px-0">
              {title}
          </p>

          <Bar width={100}
              height={30}
              options={statusOptions} 
              data={data}>
          </Bar>
      </Box> 
    );
};

export default BarChart;