import React, {Component, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Container from 'react-bootstrap/Container'
import CardNotVerified from "../card-notverified.component";
import Dasbor from "../../dasbor";
import axios from "axios";
import hands_phone from '../../../hands_phone.svg'; 
import { ClassNames } from "@emotion/react";
import classes from '../styles.module.css';
import CustomButton from "../../custom-button";

const ViewAllPermintaan = () => {
    const [listToVerify, setListToVerify] = useState([]);

    useEffect(() => {
        fetchKarilToVerify();
    }, [])

    const fetchKarilToVerify = async () => {
        let status = "0";
        const url = `api/daftar-verifikasi/?status=${status}`
        axios.get(url).then(response => {
            setListToVerify(response.data);
            console.log(listToVerify)
        }).catch((error) => {
            console.log(error);
        });
    }

    return(
        <Dasbor>
            <Container>
                <h3 className="text-section-header px-0 mt-5"><span class="pull-right"><CheckCircleOutlineRoundedIcon fontSize="large" className="pl-0 mx-4"></CheckCircleOutlineRoundedIcon></span>Daftar Karya Ilmiah Terverifikasi</h3>
                
                {listToVerify.length === 0 ? (
                    <div className="text-center m-5">
                        <Container className="text-center">
                            <img
                                src={hands_phone}
                                width="213"
                                height="141"
                                className=""
                                alt="Hands Phone"/>
                            <h5><b>Belum permintaan karyaIlmiah</b></h5>
                        </Container>
                    </div>
                ):
                    <Box>
                        {listToVerify.map((c, i) =>
                            <Box my={3} key={i}>
                                <CardNotVerified data={c}/>
                            </Box>
                        )}
                    </Box>
                       
                }

            </Container>
        </Dasbor>
    )
}

export default ViewAllPermintaan;
