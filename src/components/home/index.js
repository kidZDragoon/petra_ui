import React, {Component} from "react";
import classes from "./styles.module.css";
import CardPengumuman from "../cardPengumuman";
import { Container } from "react-bootstrap";
import axios from "axios";
import logo_text from '../../logo_text.svg';
import { Link } from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPengumuman:[],
        }
        this.loadPengumumanListData = this.loadPengumumanListData.bind(this);

    }
   
    componentDidMount() {
        this.loadPengumumanListData()
    }

    async loadPengumumanListData(){
        try {
            const { data } = await axios.get("/api/pengumuman/");
            this.setState({ listPengumuman: data.data.reverse()});
            console.log(this.state.listPengumuman)

        } catch (error) {
            alert("Oops terjadi masalah pada server");
        }
    }

    render(){
        return(
            <Container >
                <div className={classes.section}>
                    <div  className={classes.home}>
                    <img
                    src={logo_text}
                    width="250"
                    height="120"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    id={classes["logo_text"]}/>
                    {/* <p>Perpustakaan Digital Departemen<br/>Kesejahteraan Sosial FISIP  UI</p> */}
                    <h2  className={classes.jargon}>Jelajahi karya ilmiah tentang kesejahteraan sosial. </h2>
                    </div>
                
                </div>
               
                <div className={classes.pengumuman}>
                    <div class="d-flex justify-content-between">
                        <div class="p-2"><h3 className={classes.judulPengumuman}>Pengumuman</h3></div>
                        <div class="p-2"><Link to="/list-pengumuman" className={classes.link}>
                            lihat semua</Link></div>
                    
                    </div>
                {this.state.listPengumuman.map((pengumuman) => (
                    <CardPengumuman judul={pengumuman.judul} tglDibuat={pengumuman.tglDibuat} 
                    pesan={pengumuman.isiPengumuman} id={pengumuman.id} isStaf={false}/>
                ))}
              
                </div>
                
           
                    <div className={classes.space}>

                    </div>
            </Container>
        )
    }
}