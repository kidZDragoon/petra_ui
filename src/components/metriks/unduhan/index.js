import React, {useEffect, useState} from "react";
import classes from '../styles.module.css';
import '../../../index.css';
import axios from "axios";
import "@fontsource/mulish";
import Dasbor from "../../dasbor";     
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
    Stack,
    Box,
    Button,
  } from "@mui/material";
import { BarChartSelectYear } from "../chart.component";

const MetriksUnduhan = () => {
    const [dataMetriks, setDataMetriks] = useState([]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    useEffect(() => {
        fetchTop3();
    }, [])

    const fetchTop3 = async () => {
        let url = `/api/metriks/unduhan/top3/`
        axios.get(url)
        .then(response => {
            console.log("response ", response);
            setDataMetriks(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const statusOptions = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    font:{
                        size:12
                    },
                }
            },
            y: {
                grace: '5%',
            }
        },
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: false,
            },
            maintainAspectRatio: false,
        },
      };

    return (
        <Dasbor className={classes.mainContent}>
            <Box py={8} px={12}>
                <Box
                    sx={{
                    width: '60%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    mb:4,
                    borderRadius: 1,
                    }}
                >
                    <Button mx={4} variant="outlined" href="#/metriks/pengunjung">Metriks Pengunjung</Button>
                    <Button mx={4} variant="outlined" href="#/metriks/unduhan">Metriks Unduhan</Button>
                    <Button mx={4} variant="outlined" href="#/metriks/unggahan">Metriks Unggahan</Button>
                </Box>
                <p className="text-section-header px-0">
                    Statistik Unduhan Karya Ilmiah
                </p>

                <Stack spacing={2} mt={5}>
                    <BarChartSelectYear sourceDataURL="api/metriks/unduhan"
                            yearDataURL="api/metriks/unduhan/get-year/"
                            title="Jumlah unduhan tahun ">
                    </BarChartSelectYear>

                    {dataMetriks.dataTop3 && dataMetriks.dataTop3.labels && dataMetriks.dataTop3.chartData ? 
                        <Box py={4} pl={4} pr={12} className={classes.metricsCard}>
                            <p className="text-bold-title px-0">
                                Top 3 Karya Ilmiah Paling Banyak Diunduh
                            </p>
                
                            <Bar width={100}
                                height={30}
                                options={statusOptions} 
                                data={{
                                    labels: dataMetriks.dataTop3.labels,
                                    datasets: [
                                        {
                                            data: dataMetriks.dataTop3.chartData,
                                            backgroundColor: ['rgba(226, 162, 85, 1)', 'rgba(88, 146, 156, 1)', 'rgba(210, 105, 48, 1)', 'rgba(131, 159, 88, 1)']
                              
                                        }
                                    ]
                                  }}>
                            </Bar>
                        </Box> 
                        : ''
                    }


                </Stack>
            </Box>
        </Dasbor>
        
    );               
}

export default MetriksUnduhan;
