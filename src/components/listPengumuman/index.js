import React, {Component} from "react";
import classes from "./styles.module.css";
import CardPengumuman from "../cardPengumuman";
import { Button } from "react-bootstrap";
import axios from "axios";
import AuthenticationDataService from "../../services/authentication.service";
import { Link } from "react-router-dom";
import {PlusLg} from "react-bootstrap-icons";
import Dasbor from "../dasbor";
import { Container } from "@mui/material"

export default class ListPengumuman extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPengumuman:[],
            isDelete:false,
            isStaf:false,
        }
        this.loadPengumumanListData = this.loadPengumumanListData.bind(this);

    }
   
    componentDidMount() {
        this.loadUser()
        this.loadPengumumanListData()
    }

    deletePengumuman(){
        this.setState({isDelete:true})
        console.log(this.state.isDelete)
    };

    async loadPengumumanListData(){
        try {
            const { data } = await axios.get("/api/pengumuman/");
            this.setState({ listPengumuman: data.data.reverse(), isDelete: false});
            console.log(this.state.listPengumuman)

        } catch (error) {
            alert("Oops terjadi masalah pada server");
        }
    }

    async loadUser(){
        try {
            let token = localStorage.getItem("ssoui");
            console.log(token);
            token = JSON.parse(token);
            console.log(token);
            if (token !== null){
                const response = await AuthenticationDataService.profile(token);
                console.log(response);
                console.log(response.data.role);
                if (response.data.role === "staf"){
                    this.setState({isStaf:true});
                }else{
                    this.setState({isStaf:false});
                }
            }else{
                this.setState({isStaf:false});
            }
            

        } catch {
            console.log("Load user error!");
        }
    }

    render(){
        return(
            <Dasbor>
                 <Container py={4} px={8}>
                    {this.state.isStaf ?
                    <div class="d-flex justify-content-between" id={classes["heading"]}>
                    <div class="p-2"> <h3 className={classes.judulPengumuman}>Kelola Pengumuman</h3></div>
                    <div class="p-2" >
                        <Link to="/form-pengumuman" className={classes.link}>
                            <Button className="btn btn-full-width btn-orange text-bold-large"  id={classes["button"]}> 
                                <span ><PlusLg/> &nbsp;Tambah Pengumuman</span>
                            </Button>
                        </Link>
                    </div>
            
                </div>:
                    <h3 className={classes.judulListPengumuman}>List Pengumuman</h3>
                    }
                    
                    {this.state.listPengumuman.map((pengumuman) => (
                        <CardPengumuman judul={pengumuman.judul} tglDibuat={pengumuman.tglDibuat} 
                        pesan={pengumuman.isiPengumuman} id={pengumuman.id} deleteHandler={this.loadPengumumanListData}
                        isStaf={this.state.isStaf}/>
                    ))}
                </Container>
            </Dasbor>
           
        )
    }
}