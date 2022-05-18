import React, {Component} from "react";
import classes from "./styles.module.css";
import CardPengumuman from "../cardPengumuman";
import { Container } from "react-bootstrap";
import axios from "axios";
import logo_text from '../../logo_text.svg';
import { Link } from "react-router-dom";
import {
  InputAdornment,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Search } from "@mui/icons-material";
import Home1 from '../../Home1.svg'
import Home2 from '../../Home2.svg'
import Grid from '@mui/material/Grid';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPengumuman:[],
            keyword : "",
        }
        this.loadPengumumanListData = this.loadPengumumanListData.bind(this);

    }
   
    componentDidMount() {
        this.loadPengumumanListData()
    }

    async loadPengumumanListData(){
        try {
            const { data } = await axios.get("/api/pengumuman/");
            this.setState({ listPengumuman: data.data.reverse().slice(0,5)});
            console.log(this.state.listPengumuman)

        } catch (error) {
            alert("Oops terjadi masalah pada server");
        }
    }

    pencarian() {
        window.location.replace("#/Search/" + this.state.keyword)
    }

    render(){
        return(
            <>
                <Grid container spacing={2}>
                    <Grid item lg={3} sx={{display: {xs: "none", lg: "block"}}}>
                        <img src={Home1} alt="gambar1" />
                    </Grid>
                    <Grid item xs={12} lg={9} zIndex={2}>
                        <Container>
                            <div className={classes.section}>
                                <div className={classes.home}>
                                    <img
                                        src={logo_text}
                                        width="250"
                                        height="120"
                                        className="d-inline-block align-top"
                                        alt="React Bootstrap logo"
                                        id={classes["logo_text"]} />
                                    <h2 className={classes.jargon}>Jelajahi karya ilmiah tentang<br/>kesejahteraan sosial.</h2>

                                    <Box my={5}>
                                        <TextField
                                            className={classes.search_bar}
                                            label="Cari Karya Ilmiah Berdasarkan Judul, Penulis, atau Kata Kunci"
                                            fullWidth
                                            value={this.state.keyword}
                                            onChange={(event) => this.setState({ keyword: event.target.value })}
                                            onKeyPress={(ev) => {
                                                if (ev.key === "Enter") {
                                                    this.pencarian();
                                                }
                                            } }
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <Search />
                                                    </InputAdornment>
                                                ),
                                            }} />
                                    </Box>
                                </div>
                            </div>
                        </Container>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} lg={9} zIndex={2}>
                        <Container>
                            <div className={classes.section_pengumuman}>
                                <div className={classes.pengumuman}>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="p-2"><h3 className={classes.judulPengumuman}>Berita Terbaru</h3></div>
                                        <div class="p-2"><Link to="/list-pengumuman" className={classes.link}>
                                            lihat semua</Link></div>
                                    </div>
                                    {this.state.listPengumuman.slice(0,3).map((pengumuman) => (
                                        <CardPengumuman judul={pengumuman.judul} tglDibuat={pengumuman.tglDibuat}
                                            pesan={pengumuman.isiPengumuman} id={pengumuman.id} isStaf={false} />
                                    ))}

                                </div>
                            </div>
                        </Container>
                    </Grid>
                    {/* <Grid item xs={3} display="flex" justifyContent="flex-end">
                        <img src={Home2} alt="gambar2" />
                    </Grid> */}
                    <Box sx={{position: 'absolute', right: 0}}>
                        <img src={Home2} alt="gambar2" />
                    </Box>
                </Grid>
                
            </>
        )
    }
}