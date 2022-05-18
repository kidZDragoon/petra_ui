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
import Button from 'react-bootstrap/Button';
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
        <Dasbor className={classes.mainContent}>
            <Box py={8} px={8}>
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
                    <Button mx={4} className="rounded-pill btn-orange" variant="outlined" href="#/metriks/pengunjung">Metriks Pengunjung</Button>
                    <Button mx={4} className="rounded-pill btn-orange-secondary" variant="outlined" href="#/metriks/unduhan">Metriks Unduhan</Button>
                    <Button mx={4} className="rounded-pill btn-orange-secondary"  variant="outlined" href="#/metriks/unggahan">Metriks Unggahan</Button>
                </Box>
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
        </Dasbor>
        
    );               
}

export default MetriksPengunjung;
