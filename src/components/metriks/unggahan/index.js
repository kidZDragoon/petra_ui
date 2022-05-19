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
import {
    Stack,
    Box,
  } from "@mui/material";
import BarChart from "../chart.component";
import CustomButton from "../../custom-button"



const MetriksUnggahan = () => {
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
        fetchMetricsUnggahan();
    }, [])

    const fetchMetricsUnggahan = async () => {
        let url = `/api/metriks/unggahan/`
        axios.get(url)
        .then(response => {
            console.log(response);
            setDataMetriks(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <Dasbor className={classes.mainContent}>
            <Box py={8} px={8}>
                <Stack direction="row" gap={4} mb={4}>
                    <a href="#/metriks/pengunjung">
                        <CustomButton mx={4} variant="tab-inactive">Metriks Pengunjung</CustomButton>
                    </a>
                    <a className="text-bold-large" href="#/metriks/unduhan">
                        <CustomButton mx={4} variant="tab-inactive">Metriks Unduhan</CustomButton>
                    </a>
                    <a className="text-bold-large" href="#/metriks/unggahan">
                        <CustomButton mx={4} variant="tab-active">Metriks Unggahan</CustomButton>
                    </a>
                </Stack>

                <p className="text-section-header px-0">
                    Statistik Unggahan Karya Ilmiah
                </p>

                <Stack spacing={2} mt={5}>
                    {/* STATUS */}
                    {dataMetriks.dataStatus && dataMetriks.dataStatus.labels && dataMetriks.dataStatus.chartData ? 
                        <BarChart sourceData={dataMetriks.dataStatus} 
                                title="Unggahan karya ilmiah berdasarkan status verifikasi"></BarChart>
                        : ''
                    }

                    {/* SEMESTER */}
                    {dataMetriks.dataSemester && dataMetriks.dataSemester.labels && dataMetriks.dataSemester.chartData ? 
                        <BarChart sourceData={dataMetriks.dataSemester}
                                title="Unggahan karya ilmiah berdasarkan jenis"></BarChart>
                        : ''
                    }
                    
                    {/* JENIS */}
                    {dataMetriks.dataJenis && dataMetriks.dataJenis.labels && dataMetriks.dataJenis.chartData ? 
                        <BarChart sourceData={dataMetriks.dataJenis}
                                    title="Unggahan karya ilmiah berdasarkan semester"></BarChart>
                        : ''
                    }

                    <Box>
                        <canvas id="metriksSemester"></canvas>
                    </Box>
                </Stack>
            </Box>
        </Dasbor>
        
    );               
}

export default MetriksUnggahan;
