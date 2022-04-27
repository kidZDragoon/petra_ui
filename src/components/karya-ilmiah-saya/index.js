import React, {Component} from "react";
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack';
import '../../index.css';
import CardKarilStatus from "../verifikasi/card-karilstatus.component";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import axios from "axios";
import Box from "@mui/material/Box";
import AuthenticationDataService from "../../services/authentication.service";

export default class KaryaIlmiahSaya extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.loadUser = this.loadUser.bind(this)
        this.state = {
            karyaIlmiahSaya: [],
            userId: "" };
    }

    async loadUser(){
        try {
            let token = localStorage.getItem("ssoui");
            token = JSON.parse(token);

            if (token !== null){
                const response = await AuthenticationDataService.profile(token);
                this.setState({userId:response.data.id}); //atau kalau pake functional component sama aja tinggal disesuain
            }

            const { data } = await axios.get(`/api/karya-ilmiah-saya/get-all/${this.state.userId}`);
            this.setState({ karyaIlmiahSaya: data.data });
            console.log(this.state.karyaIlmiahSaya)
            console.log(this.state.userId)

        } catch {
            console.log("Load user error!");
        }
    }
    
    // async loadKaryaIlmiahData(){
    //     try {
    //         const { data } = await axios.get(`http://localhost:8000/api/karya-ilmiah-saya/get-all/${this.state.userId}`);
    //         this.setState({ karyaIlmiahSaya: data.data });
    //         console.log("masok pak eko")
    //     } catch (error) {
    //         alert("Oops terjadi masalah pada server");
    //     }
    // }
    
    componentDidMount() {
        this.loadUser();
    }

    render() {
  
        return(
            <Container className="main-container list row">
                <p className="text-section-header px-0">
                    <span className="pull-right">
                        <Link to="/" className="pl-0 mx-4 text-orange">
                            <ChevronLeftIcon fontSize="large"></ChevronLeftIcon>
                            </Link>
                    </span>
                    Unggahan Karya Ilmiah
                </p>

            <Box>
            {this.state.karyaIlmiahSaya.map((karil, i) =>
                <Box my={3} key={i}>
                    <CardKarilStatus data={karil}/>
                </Box>
            )}
            </Box>

            </Container>
            
        );
    }
}