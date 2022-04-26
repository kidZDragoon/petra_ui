import React, {Component} from "react";
import Container from 'react-bootstrap/Container'
import axios from "axios";
import classes from "./styles.module.css";
import { Link } from "react-router-dom";
import AuthenticationDataService from "../../services/authentication.service";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

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
                    this.setState({role: response.data.role, link:"/list-pengumuman"});
                }else{
                    this.setState({role: response.data.role, link:"/"});
                }
            }else{
                this.setState({link:"/"});
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

    render (){
        return (
            <Container>
                 <p className="text-section-header px-0">
                    <span class="pull-right">
                    <Link to={this.state.link} className="pl-0 mx-4 text-orange">
                            <ChevronLeftIcon fontSize="large"></ChevronLeftIcon>
                    </Link>
                    </span>
                    {this.state.judul}
                </p>
                <div className={classes.area}>
                    <p className={classes.date}>tgl dibuat : {this.state.tglDibuat}</p>
                    <p className={classes.date}>tgl disunting : {this.state.tglDisunting}</p>
                    <div className={classes.line}></div>
                    <p className={classes.pesan}>{this.state.pesan}</p>
                </div>
               
            </Container>
        )
    }
}