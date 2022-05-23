import React, { useEffect, useState } from 'react';
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
import '../../index.css';
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import { Bar } from 'react-chartjs-2';
import axios from "axios";

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
      scales: {
        y: {
            grace: '5%',
            ticks: {
              precision: 0,
          }
        }
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

export const BarChartSelectYear = ({title, sourceDataURL, yearDataURL}) => {

  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [listTahun, setListTahun] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleString());

  useEffect(() => {
    loadYearData();
    loadMetricsData();
  }, [tahun])

  async function loadYearData(){
    try {
      const { data } = await axios.get(yearDataURL);
      setListTahun(data.data);

    } catch (error) {
        alert("Oops terjadi masalah pada server");
    }
  }

  const handleTahunChange = (event) => {
    setTahun(event.target.value);
  }

  function loadMetricsData(){
      const url = `${sourceDataURL}/${tahun}`;
      axios.get(url)
        .then(response => {
          setSourceData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }

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
    scales: {
      y: {
          grace: '5%',
          ticks: {
            precision: 0,
        }
      }
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
    
      <Box py={4} px={4} className={classes.metricsCard}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <p className="text-bold-title px-0" id="tahun">
              {title} {tahun}
          </p>
          
          <FormControl py={3} size="medium">
            <InputLabel id="select-label">Tahun</InputLabel>
            <Select
              labelId="select-label"
              id="select-tahun"
              value={tahun}
              label="Tahun"
              onChange={handleTahunChange}
            >
              {listTahun.map(t => (
                    <MenuItem value={t} key={t}>
                        {t}
                    </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      
      {sourceData && sourceData.labels && sourceData.chartData ? 
      <Box py={4}>
        <Bar width={100}
          height={30}
          options={statusOptions} 
          data={data}>
        </Bar>
      </Box>
        
        : ""
      }
    </Box>
      
  );
};
