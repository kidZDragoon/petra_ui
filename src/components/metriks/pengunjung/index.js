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
    Typography,
    // Button,
  } from "@mui/material";
import Button from 'react-bootstrap/Button';
import { BarChartSelectYear, BarChart } from "../chart.component";
import CustomButton from "../../custom-button";

const MetriksPengunjung = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

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
            <Box py={6} px={8}>

                <Stack direction="row" gap={4} mb={4}>
                    <a href="#/metriks/pengunjung">
                        <CustomButton mx={4} variant="tab-active">Metriks Pengunjung</CustomButton>
                    </a>
                    <a className="text-bold-large" href="#/metriks/unduhan">
                        <CustomButton mx={4} variant="tab-inactive">Metriks Unduhan</CustomButton>
                    </a>
                    <a className="text-bold-large" href="#/metriks/unggahan">
                        <CustomButton mx={4} variant="tab-inactive">Metriks Unggahan</CustomButton>
                    </a>
                </Stack>

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
