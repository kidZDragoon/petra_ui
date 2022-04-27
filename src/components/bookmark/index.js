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
import AuthenticationDataService from "../../services/authentication.service";
import axios from "axios";
import fileDownload from "js-file-download";
import {Heart,HeartFill} from "react-bootstrap-icons";
import CardPengumuman from "../cardPengumuman";
import CardKaril from "../card/card-karil.component";

export default class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRemoveBookmark:false,
            isDownload:false,
            isFavorite:true,
            listBookmark:[],
            karilId:"",
            fileURI:"",
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.showRemoveBookmark = this.showRemoveBookmark.bind(this)
        this.hideRemoveBookmark = this.hideRemoveBookmark.bind(this)
        this.removeBookmark = this.removeBookmark.bind(this)
        this.showDownload = this.showDownload.bind(this)
        this.hideDownload = this.hideDownload.bind(this)
        this.favoriteControl = this.favoriteControl.bind(this)
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
                        axios.post('http://localhost:8000/api/daftarBookmark', {
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

    favoriteControl(id){
        if (this.state.isFavorite) {
            try {
                let token = localStorage.getItem("ssoui");
                token = JSON.parse(token);
                AuthenticationDataService.profile(token)
                    .then(response => {
                        console.log('get profile')
                        console.log(response)
                        try {
                            axios.put('http://localhost:8000/api/daftarBookmark/delete/'+id, {
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
                            axios.put('http://localhost:8000/api/daftarBookmark/add/'+id, {
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
    };

    showRemoveBookmark = () => {
        this.setState({isRemoveBookmark:true})
    }

    hideRemoveBookmark  = () => {
        this.setState({isRemoveBookmark:false})
    }

    removeBookmark = () => {
        console.log('removeBookmark')
    }

    showDownload = (id, fileURI) => {
        this.setState({isDownload:true,
        karilId: id, fileURI: fileURI})
    }

    hideDownload  = () => {
        this.setState({isDownload:false,
        karilId: ""})
    }

    handlePDFDownload = () => {
        try {
            let token = localStorage.getItem("ssoui");
            token = JSON.parse(token);
            AuthenticationDataService.profile(token)
                .then(response => {
                    console.log('get profile & fill state')
                    console.log(response)
                    try {
                        axios.post('http://localhost:8000/api/daftarUnduhan', {
                            'karyaIlmiah': this.state.karilId,
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
        } catch {
            alert("Load profile error");
        }

        axios.get('http://localhost:8000/api/download/'+ this.state.fileURI, {
            responseType: 'blob',
        }).then(res => {
            console.log('get the pdf file from cloud')
            fileDownload(res.data, this.state.judul+'.pdf');
            console.log(res);
            window.location.reload();
        }).catch(err => {
            console.log(err);
        })

    }

    render() {
        return(
            <Container id={classes["containerID"]}>
                <h3 className="text-section-header px-0">
                    <FavoriteIcon></FavoriteIcon>
                    <span className="mx-2">Karya Ilmiah Favorit</span>
                </h3>
                <br/>

                {this.state.listBookmark.map((karil,idx) => (
                <Box my={3} key={idx}>
                    <Card>
                        <Card.Body>
                                <Stack direction={"horizontal"}>
                                    <Card.Subtitle className="mb-2" style={{marginRight: 'auto'}}>{karil.jenis}</Card.Subtitle>

                                    {this.state.isFavorite === false ? (
                                        <button id={classes["features"]} onClick={() => this.favoriteControl(karil.id)}>
                                            <Heart/>
                                        </button>
                                    ):
                                        <button id={classes["features"]} onClick={() => this.favoriteControl(karil.id)}>
                                            <HeartFill style={{ color: 'red' }}/>
                                        </button>
                                    }
                                </Stack>
                                <Card.Title>{karil.judul}</Card.Title>
                                <Card.Subtitle className="mt-1 mb-1 text-muted">{karil.tglDisetujui}</Card.Subtitle>
                                <Card.Text>{karil.author}</Card.Text>
                                <button id={classes["features"]} onClick={() => this.showDownload(karil.id, karil.fileURI)}>
                                    <BoxArrowDown/> &nbsp;Unduh PDF
                                </button>
                        </Card.Body>
                    </Card>
                </Box>
                ))}

                <Modal className={classes.modal} show={this.state.isDownload} onHide={this.hideDownload}>
                    <ModalHeader className={classes.modalHeader} >
                        <h5 className="modal-title" id="exampleModalLongTitle">Apakah anda yakin
                            ingin mengunduh karya ilmiah ini?</h5>
                        <h4 type="button" className={classes.close}  onClick={this.hideDownload}>
                            <span aria-hidden="true">&times;</span>
                        </h4>
                    </ModalHeader>
                    <ModalBody className={classes.modalBody}>
                        Penulis karya ilmiah, dosen pembimbing terkait, serta staf akan dapat
                        melihat bahwa anda telah mengunguh karya ilmiah ini.
                    </ModalBody>
                    <ModalFooter className={classes.modalFooter}>
                        <button type="button" className="btn btn-primary" onClick={this.hideDownload}
                                id={classes["cancle"]}>Batal</button>
                        <button type="button" className="btn btn-primary" id={classes["accept"]}
                        onClick={() => this.handlePDFDownload()}>Ya</button>
                    </ModalFooter>
                </Modal>
            </Container>
        )
    }
}
