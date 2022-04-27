import React, {useEffect, useState} from "react";
import '../../index.css';
import "@fontsource/mulish"; 
import missing_page from '../../missing_page.svg';  
import {
    Stack,
    Box,
  } from "@mui/material";
import Button from '../button'

const MissingPage = () => {

    useEffect(() => {
    }, [])

    return (

        <Box py={8} px={8} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            }}
            minHeight='70vh'>

            <Stack>
                <img
                    src={missing_page}
                    width="426"
                    height="282"
                    className=""
                    alt="Missing Page"/>
                <p className="text-section-header text-center">Halaman yang Anda cari <br></br>tidak ditemukan</p>
                
                <Button spacing="mt-3" variant="primary" href="/">
                    <p className="text-bold-large text-institutional-white m-0 p-0">Kembali ke beranda</p>
                 </Button>
            </Stack>
        </Box>

        
    );               
}

export default MissingPage;
