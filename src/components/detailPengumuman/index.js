import React, {Component} from "react";
import Container from 'react-bootstrap/Container'
import axios from "axios";
import classes from "./styles.module.css";
import { Link } from "react-router-dom";
import AuthenticationDataService from "../../services/authentication.service";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Grid from '@mui/material/Grid';
import {FaEdit} from "react-icons/fa";
import {RiDeleteBin6Fill} from "react-icons/ri";
import ConfirmationPopUp from '../modals/confirmation-pop-up';
import SuccessModalWithButton from "../modals/success-modal-with-button";
import Dasbor from "../dasbor";

export default class DetailPengumuman extends Component{
    constructor(props) {
        super(props);
        this.handleDetailPengumuman = this.handleDetailPengumuman.bind(this);
        this.state = {
            judul:"",
            tglDibuat:Date,
            tglDisunting:Date,
            pesan:"",
            id:"",
            role:"",
            link:"",
            isOpenDelete:false,
            successModal: false,
            title:"",
            message:"",
            isStaf:false,
            
        }
    }

    componentDidMount() {
        this.loadUser()
        const pathname = window.location.href.split("/detail-pengumuman/")[1];
        this.handleDetailPengumuman(pathname);
        // let token = localStorage.getItem("ssoui")
        // token = JSON.parse(token)
        // this.setState({user: token})
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
                    this.setState({role: response.data.role, link:"/list-pengumuman", isStaf:true});
                }else{
                    this.setState({role: response.data.role, link:"/list-pengumuman", isStaf:false});
                }
               
            }else{
                this.setState({link:"/list-pengumuman", isStaf:false});
            }
            
           
            

        } catch {
            console.log("Load user error!");
        }
    }

    async handleDetailPengumuman(item,event){
        // event.preventDefault()
        try{
            console.log(item)
            const {data}= await axios.get("/api/pengumuman/"+ item);
            console.log(data)
            this.setState({judul: data.data.judul, tglDibuat: data.data.tglDibuat,
                tglDisunting: data.data.tglDisunting, pesan: data.data.isiPengumuman, id: data.data.id}) 
            
           
        }catch(error){
            alert("Oops terjadi masalah pada server")

        }
    }

    openDeleteButton = () => {
        this.setState({isOpenDelete:true, title:"Hapus pengumuman dengan judul '"+this.state.judul+"'?"})
    }

    hideDeleteButton = () => {
        this.setState({isOpenDelete:false})
    }

    async handleDelete(){
        try {
            this.setState({isOpenDelete:false}); 
            axios.delete("/api/pengumuman/" + this.state.id);
            this.setState({successModal:true, message:"Pengumuman dengan judul '"+this.state.judul+"' berhasil dihapus" })
        }
        catch (error) {
            alert("Oops terjadi masalah pada server");
        }
    }

    render (){
        return (
            <div>
            {this.state.isStaf?
            <Dasbor>
            <Container id={classes["containerID"]} className={classes.pengumumanstaf}>
                 <ConfirmationPopUp action={() => this.handleDelete()}
                        show={this.state.isOpenDelete}
                        hide={this.hideDeleteButton}
                        title={this.state.title}
                        content="Dengan menghapus pengumuman, maka seluruh pengguna tidak dapat melihat pengumuman ini">
                </ConfirmationPopUp>
                <SuccessModalWithButton show={this.state.successModal}
                                        title="Pengumuman berhasil dihapus"
                                        content={this.state.message}
                                        buttonText="Lihat daftar pengumuman"
                                        link="/list-pengumuman" >
                </SuccessModalWithButton>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <div className="d-flex flex-row" id={classes["title"]}>
                            <Link to="/list-pengumuman" className="pl-0 mx-4 text-orange">
                                    <ChevronLeftIcon fontSize="large"></ChevronLeftIcon>
                            </Link>
                            <p className="text-section-header px-2">
                            {this.state.judul}
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={2} id={classes["actionbutton"]}>
                        {this.state.role === "staf" ?
                        <div className="d-flex">
                            <Link to={`/update-pengumuman/${this.state.id}`} id={classes["editbutton"]}>
                                <FaEdit size={24}/>
                            </Link>
                            <button id={classes["deletebutton"]} onClick={this.openDeleteButton}>
                                <RiDeleteBin6Fill size={24}/>
                            </button>
                        </div>
                        : null
                        }
                    </Grid>
                </Grid>
                <div className={classes.area}>
                    <p className={classes.date}>Tanggal dibuat: {this.state.tglDibuat}</p>
                    <p className={classes.date}>Tanggal disunting: {this.state.tglDisunting}</p>
                    <div className={classes.line}></div>
                    <p className={classes.pesan}>{this.state.pesan}</p>
                    
                </div>
               <div className={classes.emptyarea}></div>
               </Container>
               </Dasbor>:
               <Container id={classes["containerID"]}>
                   <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <div className="d-flex flex-row" id={classes["title"]}>
                            <Link to={this.state.link} className="pl-0 mx-4 text-orange">
                                    <ChevronLeftIcon fontSize="large"></ChevronLeftIcon>
                            </Link>
                            <p className="text-section-header px-2">
                            {this.state.judul}
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={2} id={classes["actionbutton"]}>
                        {this.state.role === "staf" ?
                        <div className="d-flex">
                            <Link to={`/update-pengumuman/${this.state.id}`} id={classes["editbutton"]}>
                                <FaEdit size={24}/>
                            </Link>
                            <button id={classes["deletebutton"]} onClick={this.openDeleteButton}>
                                <RiDeleteBin6Fill size={24}/>
                            </button>
                        </div>
                        : null
                        }
                    </Grid>
                </Grid>
                <div className={classes.area}>
                    <p className={classes.date}>tgl dibuat : {this.state.tglDibuat}</p>
                    <p className={classes.date}>tgl disunting : {this.state.tglDisunting}</p>
                    <div className={classes.line}></div>
                    <p className={classes.pesan}>{this.state.pesan}</p>
                    
                </div>
               <div className={classes.emptyarea}></div>
               </Container>
            }
            </div>
        )
    }
}