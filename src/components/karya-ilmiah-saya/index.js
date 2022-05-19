import React, {Component} from "react";
import {Link} from "react-router-dom";
// import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack';
import '../../index.css';
import CardKarilStatus from "../verifikasi/card-karilstatus.component";
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import axios from "axios";
import {Container, Box} from "@mui/material";
import AuthenticationDataService from "../../services/authentication.service";
import BarLoader from "react-spinners/BarLoader";
import CustomButton from "../custom-button";

export default class KaryaIlmiahSaya extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.loadUser = this.loadUser.bind(this)
        this.state = {
            karyaIlmiahSaya: [],
            userId: "",
            isLoading: true,
        };
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
            this.setState({ isLoading: false });
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
            <Container className="main-container list row" 
                sx={{
                    height: '80vh',
                }}
            >
                {this.state.isLoading ? 
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}
                        >
                        <BarLoader color="#d26903" loading={this.state.isLoading} css="" size={100} />               
                    </Box>

                :  <Box pb={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: '100%',
                                p: 1,
                                mb: 4,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                            }}
                        >
                            <Stack direction="horizontal" gap={3}>
                                <span className="pull-right">
                                    <LibraryBooks fontSize="large"></LibraryBooks>
                                </span>
                            
                                <h3 className="text-section-header px-0 my-0">Karya Ilmiah Saya</h3>
                            </Stack>

                            <a href="#/karya-ilmiah-saya/upload">
                                <CustomButton variant="primary">Unggah Karya Ilmiah</CustomButton>
                            </a>
                                  
                        </Box>
                       
                        <Box>
                            {this.state.karyaIlmiahSaya.map((karil, i) =>
                                <Box my={3} key={i}>
                                    <CardKarilStatus data={karil}/>
                                </Box>
                            )}
                        </Box>

                    </Box>
                } 

            </Container>
            
        );
    }
}