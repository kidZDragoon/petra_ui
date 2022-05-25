import React, {Component} from "react";
import classes from "./styles.module.css";
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import AccordionBody from 'react-bootstrap/AccordionBody'
import AccordionItem from 'react-bootstrap/AccordionItem'
import AccordionHeader from 'react-bootstrap/AccordionHeader'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import {Files} from "react-bootstrap-icons";
import {BoxArrowDown} from "react-bootstrap-icons";
import {Heart} from "react-bootstrap-icons";
import {HeartFill} from "react-bootstrap-icons";
import {FaEdit} from "react-icons/fa";
import {RiDeleteBin6Fill} from "react-icons/ri";
import {Link} from "react-router-dom";
import axios from "axios";
import AuthenticationDataService from "../../services/authentication.service";
import Button from 'react-bootstrap/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Grid from '@mui/material/Grid';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import App from "../../App"; //buat sso
import BarLoader from "react-spinners/BarLoader";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';

var fileDownload = require('js-file-download');

export default class Detail extends (Component, App) {
    constructor() {
        super();
        this.state = {
            karyaIlmiah: null,
            isOpen:false,
            isCite:false,
            setIsOpen:false,
            isFavorite:false,
            isOpenDelete:false,
            successModal: false,
            id:"",
            judul:"",
            abstrak:"",
            authors:"",
            jenis:"",
            kataKunci:[],
            tglVerifikasi:Date,
            url:"",
            APAstyle:"",
            IEEEstyleU:"",
            IEEEstyleL:"",
            MLAstyleU:"",
            MLAstyleL:"",
            fileURI:"",
            user:"",
            daftarPengunduh:[],
            idProfile:"",
            fullName:"",
            tglUnduh:"",
            filePDF:"",
            role:"",
            userPenandaBuku:[],
            userPengunggahId:"",
            profileId:"",
            isLoading: true,
        };
        this.handleDetailKaryaIlimah = this.handleDetailKaryaIlimah.bind(this);
        this.handleToken = this.handleToken.bind(this);
        
    }
    componentDidMount() {
        this.loadUser()
        const pathname = window.location.href.split("/KaryaIlmiah/")[1];
        this.handleDetailKaryaIlimah(pathname);
        let token = localStorage.getItem("ssoui")
        token = JSON.parse(token)
        this.setState({user: token})
    }

    async handleDetailKaryaIlimah(item,event){
        // event.preventDefault()
        try{
            console.log("item: " ,item)
            const {data}= await axios.get("/api/karyaIlmiah/"+ item);
            console.log("getting karyaIlmiah data from API")
            console.log(data)
            const listkataKunci = data.kataKunci.split(", ")
            console.log(listkataKunci)
            this.setState({karyaIlmiah: data, judul: data.judul, abstrak: data.abstrak,
            authors: data.author, jenis: data.jenis, kategori: data.listKategori, fileURI: data.fileURI ,
            tglVerifikasi:data.tglDisetujui, kataKunci:listkataKunci,
            userPenandaBuku:data.userPenandaBuku,
            userPengunggahId:data.userPengunggah.id}) //tglDisetuji jgn lupa diganti tglVerfikasi
            this.setState({id:item})
            this.setState({isLoading: false})
           
        }catch(error){
            alert("Oops terjadi masalah pada server")

        }

        try {
            let token = localStorage.getItem("ssoui");
            token = JSON.parse(token);
            AuthenticationDataService.profile(token)
                .then(response => {
                    console.log('get profile')
                    console.log(response)
                    try {
                        axios.put('api/daftarBookmark/check/'+this.state.karyaIlmiah.id, {
                            'idProfile': response.data.id,
                        }).then(response => {
                            console.log('fire DaftarUnduhan state to API')
                            console.log(response)
                            if (response.data['bookmarked'] == "true") {
                                this.setState({isFavorite: true})
                                console.log('bookmarked')
                                console.log(this.state.isFavorite)
                            } else {
                                this.setState({isFavorite: false})
                                console.log('not bookmarked')
                                console.log(this.state.isFavorite)
                            }
                        })
                    } catch {
                        alert('CheckStatusBookmark from API error')
                    }
                })
            // console.log(response)
        } catch {
            alert("Load profile error");
        }

        try {
            await axios.get('api/daftarUnduhan/'+this.state.karyaIlmiah.id)
                .then(response => {
                    console.log('getting daftarUnduhan karyaIlmiah from API')
                    console.log(response)
                    for (var i = 0; i < response.data.length; i++) {
                        const temp = [
                            response.data[i].fullName,
                        ]
                        // console.log(temp)

                        this.setState(prevState => ({
                          daftarPengunduh: [...prevState.daftarPengunduh, temp]
                        }))
                    }
                })
        } catch {
            alert("GET DaftarUnduhan from API error")
        }


    }
    
    handlePDFDownload = () => {
        try {
            let token = localStorage.getItem("ssoui");
            token = JSON.parse(token);
            AuthenticationDataService.profile(token)
                .then(response => {
                    console.log('get profile')
                    console.log(response)
                    try {
                        axios.post('api/daftarUnduhan', {
                            'karyaIlmiah': this.state.karyaIlmiah.id,
                            'idProfile': response.data.id,
                            'fullName': response.data.full_name,
                            'tglUnduh': new Date().toLocaleString() + "",
                        }).then(response => {
                            console.log('fire DaftarUnduhan state to API')
                            console.log(response)
                        })
                    } catch {
                        alert('POST DaftarUnduhan to API error')
                    }
                })
            // console.log(response)
        } catch {
            alert("Load profile error");
        }

        axios.get('api/download/'+ this.state.fileURI, {
            responseType: 'blob',
        }).then(res => {
            console.log('get the pdf file from cloud')
            fileDownload(res.data, this.state.judul+'.pdf');
            console.log(res);
            window.location.reload()
        }).catch(err => {
            console.log(err);
        })


    };

    showModal = () => {
        this.setState({isOpen:true})
    };

    favoriteControl = () => {
        if (this.state.isFavorite) {
            try {
                let token = localStorage.getItem("ssoui");
                token = JSON.parse(token);
                AuthenticationDataService.profile(token)
                    .then(response => {
                        console.log('get profile')
                        console.log(response)
                        try {
                            axios.put('api/daftarBookmark/delete/'+this.state.karyaIlmiah.id, {
                                "idProfile": response.data.id
                            }).then(response => {
                                console.log('delete bookmark')
                                console.log(response)
                                this.setState({isFavorite:!this.state.isFavorite})
                            })
                        } catch {
                            alert('DeleteBookmark API error')
                        }
                    })
            } catch {
                alert("Load profile error");
            }
        } else {
            try {
                let token = localStorage.getItem("ssoui");
                token = JSON.parse(token);
                AuthenticationDataService.profile(token)
                    .then(response => {
                        console.log('get profile')
                        console.log(response)
                        try {
                            axios.put('api/daftarBookmark/add/'+this.state.karyaIlmiah.id, {
                                "idProfile": response.data.id
                            }).then(response => {
                                console.log('PUT daftarBookmark')
                                console.log(response)
                                this.setState({isFavorite:!this.state.isFavorite})
                            })
                        } catch {
                            alert('POST daftarBookmark to API error')
                        }
                    })
            } catch {
                alert("Load profile error");
            }
        }
        // this.setState({isFavorite:!this.state.isFavorite})
    };

    hideModal = () => {
        this.setState({isOpen:false})
    };

    showCite = () => {
        this.setState({isCite:true})
        const date = new Date();
        var months = [ " ","January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];
        const apaStyleDefault = "";
        const ieeeStyleDefaultU = "";
        const ieeeStyleDefaultL = "";
        const mlaStyleDefaultU= "";
        const mlaStyleDefaultL= "";
        const listname = this.state.authors.split(" ")
        const apaStyle = apaStyleDefault.concat(listname[listname.length-1],", ", this.state.authors.split(" ")[0].split("")[0],
            ". (", this.state.tglVerifikasi.split("-")[0], ", ", months[parseInt(this.state.tglVerifikasi.split("-")[1])], " ", this.state.tglVerifikasi.split("-")[2],
            "). "
        );
        const ieeeStyleU = ieeeStyleDefaultU.concat(listname[0].split("")[0],". ", listname[listname.length-1],", ",);
        const ieeeStyleL = ieeeStyleDefaultL.concat(", Petra, ", months[parseInt(this.state.tglVerifikasi.split("-")[1])], " ", this.state.tglVerifikasi.split("-")[2], ", ",
            this.state.tglVerifikasi.split("-")[0], ".  Accessed on: ", months[date.getMonth()+1], " ", date.getDate(), ", ", date.getFullYear(), ". [Online]."
        );
        const mlaStyleU = mlaStyleDefaultU.concat(listname[listname.length-1], ", ", listname[0], '. "', this.state.judul, '." '
        );
        const mlaStyleL = mlaStyleDefaultL.concat(", ", this.state.tglVerifikasi.split("-")[2], " ", months[parseInt(this.state.tglVerifikasi.split("-")[1])], " ", this.state.tglVerifikasi.split("-")[0],
        ", "
        );
        this.setState({APAstyle:apaStyle, IEEEstyleU:ieeeStyleU,
            IEEEstyleL:ieeeStyleL, MLAstyleU:mlaStyleU, MLAstyleL:mlaStyleL})
    };

    hideCite = () => {
        this.setState({isCite:false})
    };
    
    async handleToken(){
        await this.loginHandler()
        let token = localStorage.getItem("ssoui")
        token = JSON.parse(token)
        console.log(token)
        this.setState({user: token})
        console.log(this.state.user)
    }

    openDeleteButton = () => {
        this.setState({isOpenDelete:true})
    }

    hideDeleteButton = () => {
        this.setState({isOpenDelete:false})
    }

    handleDelete = () => {
        try {
            this.setState({isOpenDelete:false}); 
            const pathname = window.location.href.split("/KaryaIlmiah/")[1];
            axios.delete("/api/delete/" + pathname);
            this.setState({successModal:true})
        }
        catch (error) {
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
                this.setState({role:response.data.role,
                                profileId:response.data.id});
            }

        } catch {
            console.log("Load user error!");
        }
    }


    render (){
        if(this.state.isLoading){
            return(
                <Container 
                    sx={{
                        height: '100vh',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '90vh',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}
                        >
                        <BarLoader color="#d26903" loading={this.state.isLoading} css="" size={100} />               
                    </Box>
                </Container> 
            )
        } else {
            return (
                <Container id={classes["containerID"]} className="my-5">
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <h6>{this.state.jenis}</h6>
                        <h3 id={classes["title"]}>{this.state.judul}</h3>
                        <p className={classes.date}>{this.state.tglVerifikasi}</p>
                        <p>{this.state.authors}</p>
                        {this.state.kataKunci.map((item) => (
                        <button className={classes.roundedPill}>{item}</button>
                        ))}
                        </Grid>
                        <Grid item xs={2} id={classes["actionbutton"]}>
                            {this.state.role === "staf" ?
                            <div className="d-flex">
                                <Link to={`/edit-karil/${this.state.id}`} id={classes["editbutton"]}>
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

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 0 }} justifyContent='flex-start' alignItems={{ xs: 'flex-start', sm: 'center' }} py={{ xs: 1, sm: 2 }}>
                        {this.state.user == null ? 
                        <button id={classes["features"]} onClick={this.handleToken} className="">
                            <Stack direction="horizontal" gap={1} alignItems="center">
                                <BoxArrowDown fontSize="large"></BoxArrowDown>
                                Unduh PDF
                            </Stack>
                        </button>: 
                        <button id={classes["features"]} onClick={this.showModal} className="">
                            <Stack direction="horizontal" gap={1} alignItems="center">
                                <BoxArrowDown fontSize="large"></BoxArrowDown>
                                Unduh PDF
                            </Stack>
                        </button> 
                        }
                        <button id={classes["features"]} onClick={this.showCite} className="">
                            <Stack direction="horizontal" gap={1} alignItems="center">
                                <Files fontSize="large"></Files>
                                Dapatkan Sitasi
                            </Stack>
                        </button>
                        {this.state.user !== null ?
                        <>
                            {this.state.isFavorite === false ? (
                                <button id={classes["features"]} onClick={this.favoriteControl} className="">
                                    <Stack direction="horizontal" gap={1} alignItems="center">
                                            
                                        <Heart fontSize="large"></Heart>
                                        Tambahkan ke favorit
                                    </Stack>
                                </button>
                                
                            ):
                                <button id={classes["features"]} onClick={this.favoriteControl} className="">
                                    <Stack direction="horizontal" gap={1} alignItems="center">
                                        
                                        <HeartFill fontSize="large"></HeartFill>
                                    
                                        Karya Ilmiah sudah ada dalam daftar favorit!
                                    </Stack>
                                </button>
                            }
                        </> :
                        <></>
                        }
                    

                    </Stack>

                    

                    <Accordion className={classes.accordion} id="accordionPanelsStayOpenExample">
                        <AccordionItem className="accordion-item">
                            <AccordionHeader className="accordion-header" >
                                Abstrak
                                <div className="line"></div>
                            </AccordionHeader>
                            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show"
                                aria-labelledby="panelsStayOpen-headingOne">
                                <AccordionBody className="accordion-body">
                                    {this.state.abstrak}
                                </AccordionBody>
                            </div>
                        </AccordionItem>

                    </Accordion>

                    <br/>
                    {(this.state.role == "staf" || (this.state.role == "mahasiswa") && this.state.userPengunggahId == this.state.profileId) ?
                    <Accordion className={classes.accordion} id="accordionPanelsStayOpenExample">
                        <AccordionItem className="accordion-item">
                            <AccordionHeader className="accordion-header" >
                                Daftar Pengunduh
                                <div className="line"></div>
                            </AccordionHeader>
                            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show"
                                aria-labelledby="panelsStayOpen-headingOne">
                                <AccordionBody className="accordion-body">
                                    {this.state.daftarPengunduh.length == 0 ?
                                        <p>Belum ada yang mengunduh karya ilmiah ini</p>
                                    : 
                                        <ol>
                                        {this.state.daftarPengunduh.map((pengunduh) =>
                                            (
                                                <li>{
                                                    pengunduh
                                                }</li>
                                            )
                                        )
                                        }
                                        </ol>
                                    }
                                    
                                </AccordionBody>
                            </div>
                        </AccordionItem>
                    </Accordion>
                        : <br/>
                    }

                    <Modal className={classes.modal} show={this.state.isOpen} onHide={this.hideModal}>
                        <ModalHeader className={classes.modalHeader} >
                            <h5 className="modal-title" id="exampleModalLongTitle">Apakah anda yakin
                                ingin mengunduh karya ilmiah ini?</h5>
                            <h4 type="button" className={classes.close}  onClick={this.hideModal}>
                                <span aria-hidden="true">&times;</span>
                            </h4>
                        </ModalHeader>
                        <ModalBody className={classes.modalBody}>
                            Penulis karya ilmiah, dosen pembimbing terkait, serta staf akan dapat
                            melihat bahwa anda telah mengunguh karya ilmiah ini.
                        </ModalBody>
                        <ModalFooter className={classes.modalFooter}>
                            <button type="button" className="btn btn-primary" onClick={this.hideModal}
                                    id={classes["cancle"]}>Batal</button>
                            <button type="button" className="btn btn-primary" id={classes["accept"]}
                            onClick={() => this.handlePDFDownload()}>Ya</button>
                        </ModalFooter>

                    </Modal>

                    <Modal className={classes.modal}  show={this.state.isCite} onHide={this.hideCite}>
                        <ModalHeader className={classes.modalCiteHeader} >
                            <h5 className="modal-title" id="exampleModalLongTitle">Sitasi Karya Ilmiah</h5>
                            <h4 type="button" className={classes.closeCite}  onClick={this.hideCite}>
                                <span aria-hidden="true">&times;</span>
                            </h4>
                        </ModalHeader>
                        <ModalBody className={classes.modalBody}>
                            <div className="d-flex">
                                <div className={classes.citeStyle}><b>APA</b></div>
                                <p className={classes.cite}>
                                    {this.state.APAstyle}<i>{this.state.judul}. &nbsp;</i>
                                    Petra. <br/> {window.location.href}
                                </p>
                            </div>
                            <div className="d-flex">
                                <div className={classes.citeStyle}><b>IEEE</b></div>
                                <p className={classes.cite}>
                                    {this.state.IEEEstyleU}<i>{this.state.judul}</i>{this.state.IEEEstyleL}<br/>
                                    Available: {window.location.href}
                                </p>
                            </div>
                            <div className="d-flex">
                                <div className={classes.citeStyle}><b>MLA</b></div>
                                <p className={classes.cite}>
                                    {this.state.MLAstyleU}<i>Petra</i>{this.state.MLAstyleL}{window.location.href}
                                </p>
                            </div>

                        </ModalBody>

                    </Modal>

                    <Modal className={classes.modal} show={this.state.isOpenDelete} onHide={this.hideDeleteButton}>
                        <ModalHeader className={classes.modalHeader} >
                            <h5 className="modal-title" id="exampleModalLongTitle">Apakah Anda yakin ingin menghapus karya ilmiah ini?</h5>
                            <h4 type="button" className={classes.close}  onClick={this.hideDeleteButton}>
                                <span aria-hidden="true">&times;</span>
                            </h4>
                        </ModalHeader>
                        <ModalFooter className={classes.modalFooter}>
                            <button type="button" className="btn btn-primary" onClick={this.hideDeleteButton}
                                    id={classes["cancle"]}>Batal</button>
                            <button type="button" className="btn btn-primary" id={classes["accept"]}
                            // tambahin onclick buat window pathname
                            onClick={this.handleDelete}>Ya</button>
                        </ModalFooter>

                    </Modal>

                    <Modal className="modal" show={this.state.successModal}>
                        <Container className="px-4 pt-4 pb-4">
                            <Row>
                                <Col sm={2}>
                                    <div className="check-container text-white d-flex justify-content-center align-items-center">
                                        <CheckCircleIcon fontSize="large" color="white"></CheckCircleIcon>
                                    </div>
                                </Col>
                                <Col sm={10}>
                                    <h5 className="modal-title text-bold-large mb-2" id="exampleModalLongTitle">Karya ilmiah berhasil dihapus!</h5>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col className="">
                                    <Link to="/Search" style={{textDecoration:"none"}}>
                                        <Button className="btn btn-full-width btn-orange text-bold-large">
                                            <span>Lihat daftar karya ilmiah</span>
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </Modal>

                </Container>
            )
        }
    }
};
