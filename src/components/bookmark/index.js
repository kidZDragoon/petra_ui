import React, {Component} from "react";
import Container from 'react-bootstrap/Container'
import '../../index.css';
import Card from "react-bootstrap/Card";
import FavoriteIcon from '@mui/icons-material/Favorite';
import classes from "../detail/styles.module.css";
import Box from "@mui/material/Box";
import {BoxArrowDown} from "react-bootstrap-icons";
import Stack from 'react-bootstrap/Stack';
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Modal from "react-bootstrap/Modal";
import CardKaril from "../card/card-karil.component";
import AuthenticationDataService from "../../services/authentication.service";
import axios from "axios";
import fileDownload from "js-file-download";
import {Heart,HeartFill} from "react-bootstrap-icons";

export default class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listBookmark:[],
        }
    }

    componentDidMount() {
        try {
            let token = localStorage.getItem("ssoui");
            token = JSON.parse(token);
            AuthenticationDataService.profile(token)
                .then(response => {
                    console.log('get profile')
                    console.log(response)
                    try {
                        axios.post('/api/daftarBookmark', {
                            "idProfile": response.data.id
                        }).then(response => {
                            console.log('Get bookmarkList')
                            console.log(response)
                            this.setState({listBookmark: response.data})
                        })
                    } catch {
                        alert('Get bookmarkList from API error')
                    }
                })
        } catch {
            alert("Load profile error");
        }
    }

    render() {
        return(
            <Container id={classes["containerID"]}>
                <h3 className="text-section-header px-0">
                    <FavoriteIcon></FavoriteIcon>
                    <span className="mx-2">Karya Ilmiah Favorit</span>
                </h3>
                <br/>

                {/* kasi kondisi kalau di slain staf tampilin hanya status 1, kalau di staf status semua */}
                {this.state.listBookmark.map((karil, idx) =>
                    <Box my={3} key={idx}>
                        <CardKaril data={karil}/>
                    </Box>
                )}
            </Container>
        )
    }
}
