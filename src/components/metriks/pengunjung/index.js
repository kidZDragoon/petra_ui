import React, {useEffect, useState} from "react";
import classes from '../styles.module.css';
import '../../../index.css';
import axios from "axios";
import "@fontsource/mulish";     
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
import { BarChartSelectYear, BarChart } from "../chart.component";



const MetriksPengunjung = () => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    useEffect(() => {
    }, [])

    return (
        <Box className={classes.mainContent}>
            <Box py={8} px={12}>
                <p className="text-section-header px-0">
                    Statistik Pengunjung Karya Ilmiah
                </p>

                <Stack spacing={2} mt={5}>
                    <BarChartSelectYear sourceDataURL="api/metriks/pengunjung"
                            yearDataURL="api/metriks/pengunjung/get-year/"
                            title="Jumlah pengunjung tahun ">
                    </BarChartSelectYear>
                </Stack>
            </Box>
        </Box>
        
    );               
}

export default MetriksPengunjung;
