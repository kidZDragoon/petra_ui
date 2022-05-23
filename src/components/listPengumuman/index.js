import React, {Component} from "react";
import classes from "./styles.module.css";
import CardPengumuman from "../cardPengumuman";
import { Button } from "react-bootstrap";
import axios from "axios";
import AuthenticationDataService from "../../services/authentication.service";
import { Link } from "react-router-dom";
import {PlusLg} from "react-bootstrap-icons";
import Dasbor from "../dasbor";
import { Container, Box } from "@mui/material"
import { Pagination } from "@material-ui/lab";
import CustomButton from "../custom-button";

export default class ListPengumuman extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPengumuman:[],
            isDelete:false,
            isStaf:false,
            page:0,
            totalPage:0,
            totalPengumuman:[],
        }
        this.loadPengumumanListData = this.loadPengumumanListData.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this)
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
            var total_page = 0;
            if(data.data.length/5 - Math.round(data.data.length/5) > 0){
                total_page = Math.round(data.data.length/5) + 1
            }else{
                total_page = Math.round(data.data.length/5)
            }
            this.setState({ totalPengumuman: data.data.reverse(), isDelete: false, totalPage:total_page,
                listPengumuman: data.data.slice(0,5)});
            console.log(this.state.totalPengumuman)
            console.log(this.state.listPengumuman)
            console.log(this.state.totalPage)

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

    handleChangePage(event, value){
        console.log("val: " + value)
        var pengumumans = this.state.totalPengumuman;
        pengumumans = pengumumans.slice((5*value)-5, 5*value)
        console.log(pengumumans)
        this.setState({listPengumuman:pengumumans})
        document.getElementById("judul").scrollIntoView();
        console.log(this.state.listPengumuman)
        console.log(this.state.totalPengumuman)
    }

    render(){
        return(
            <div>
                {this.state.isStaf?
                <Dasbor>
                    <Box py={2} px={8}
                        sx={{
                            width: '90%',
                        }}
                    >
                        <div class="d-flex justify-content-between align-items-center" id={classes["heading"]}>
                            <div class="p-2"> <h3 className={classes.judulPengumuman} id="judul">Kelola Pengumuman</h3></div>
                            <div class="p-2" >
                                <Link to="/form-pengumuman" className={classes.link}>
                                    <CustomButton variant="primary"> 
                                        <span ><PlusLg/> &nbsp;Tambah Pengumuman</span>
                                    </CustomButton>
                                </Link>
                            </div>
                
                        </div>
                       
                        {this.state.listPengumuman.map((pengumuman) => (
                            <CardPengumuman judul={pengumuman.judul} tglDibuat={pengumuman.tglDisunting} 
                            pesan={pengumuman.isiPengumuman} id={pengumuman.id} deleteHandler={this.loadPengumumanListData}
                            isStaf={this.state.isStaf}/>
                        ))}
                        <Pagination onChange={this.handleChangePage} count={this.state.totalPage} size="large" class="d-flex justify-content-center"
                        id={classes["pagination"]}/>
                    </Box>
                    
                </Dasbor>:
                <Container py={4} px={8}>
                <div class="d-flex justify-content-between" id={classes["heading"]}>
                <div class="p-2"> <h3 className={classes.judulPengumuman}>Berita</h3></div>        
                </div>
                
                {this.state.listPengumuman.map((pengumuman) => (
                    <CardPengumuman judul={pengumuman.judul} tglDibuat={pengumuman.tglDibuat} 
                    pesan={pengumuman.isiPengumuman} id={pengumuman.id} deleteHandler={this.loadPengumumanListData}
                    isStaf={this.state.isStaf}/>
                ))}
                 <Pagination onChange={this.handleChangePage} count={this.state.totalPage} size="large" class="d-flex justify-content-center"
                id={classes["pagination"]}/>
             </Container>
 
                }
            </div>
        )
    }
}