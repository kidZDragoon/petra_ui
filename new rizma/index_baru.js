import React, {Component, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Container from 'react-bootstrap/Container'
import CardNotVerified from "./card-notverified.component";
import classes from "./styles.module.css";
import axios from "axios";
import qs from "qs";
import Box from "@mui/material/Box";
import CardKaril from "../cariKaril/card-karil.component";


const DaftarVerifikasi = () => {
    const [listToVerify, setListToVerify] = useState([]);
    const [listVerified, setListVerified] = useState([]);
    const [status, setStatus] = useState("");
    const [checker, setChecker] = useState({
        isSemua: true,
        isDiterima: false,
        isDitolak: false,
        isVerifikasi: false,
        isTolakVerifikasi: false,
        isVerified: false,
        isDeclined: false,
    })
    const { isSemua, isDiterima, isDitolak, isVerifikasi, isTolakVerifikasi, isVerified, isDeclined } = checker;

    useEffect(() => {
        fetchKarilToVerify();
        fetchKarilVerified();
    }, [checker])

    const fetchKarilToVerify = async () => {
        let url = `api/daftar-verifikasi/?status=0`
        axios.get(url).then(response => {
            setListToVerify(response.data);
        }).catch((error) => {
            console.log(error);
        });
        console.log(url)
    }

    const fetchKarilVerified = async () => {
        let url = `api/daftar-verifikasi/?status=${status}`
        axios.get(url).then(response => {
            setListVerified(response.data);
        }).catch((error) => {
            console.log(error);
        });
        console.log(url)
    }

    const semuaTagControl = () => {
        setChecker({
            isSemua: true,
            isDiterima: false,
            isDitolak: false,
        })
        setStatus("")
    };

    const diterimaTagControl = () => {
        setChecker({
            isSemua: false,
            isDiterima: true,
            isDitolak: false,
        })
        setStatus("1")
    };

    const ditolakTagControl = () => {
        setChecker({
            isSemua: false,
            isDiterima: false,
            isDitolak: true,
        })
        setStatus("2")
    };
    

    console.log("Data: " , listToVerify)
    return(
        <Container>
            <Box>
            {listToVerify.map((toVerify, idx) =>
                <Box my={3} key={idx}>
                    <CardNotVerified data={toVerify}/>
                </Box>
            )}
            </Box>
            <Stack direction="horizontal" gap={3} className="mb-3 mt-3">
                {isSemua === false ? (
                    <Button className="rounded-pill" variant="outline-primary" onClick={semuaTagControl}>Lihat Semua</Button>
                ):
                    <Button className="rounded-pill" variant="primary">Lihat Semua</Button>
                }
                {isDiterima === false ? (
                    <Button className="rounded-pill" variant="outline-primary" onClick={diterimaTagControl}>Sudah diverifikasi</Button>
                ):
                    <Button className="rounded-pill" variant="primary">Sudah diverifikasi</Button>
                }
                {isDitolak === false ? (
                    <Button className="rounded-pill" variant="outline-primary" onClick={ditolakTagControl}>Verifikasi ditolak</Button>
                ):
                    <Button className="rounded-pill" variant="primary">Verifikasi ditolak</Button>
                }
                <a href="" className="ms-auto">Lihat Semua</a>
            </Stack>
            <Box>
            {listVerified.map((verified, idx) =>
                <Box my={3} key={idx}>
                    <CardNotVerified data={verified}/>
                </Box>
            )}
            </Box>
        </Container>
    )
}

export default DaftarVerifikasi;

    // semuaTagControl = () => {
    //     this.setState({isSemua: true});
    //     this.setState({isDiterima: false});
    //     this.setState({isDitolak: false});
    // };

    // diterimaTagControl = () => {
    //     this.setState({isDiterima:true});
    //     this.setState({isDitolak: false});
    //     this.setState({isSemua: false});
    // };

    // ditolakTagControl = () => {
    //     this.setState({isDitolak: true});
    //     this.setState({isDiterima: false});
    //     this.setState({isSemua: false});
    // };

    // showVerifikasi = () => {
    //     this.setState({isVerifikasi: true});
    // }

    // showTolakVerifikasi = () => {
    //     this.setState({isTolakVerifikasi: true});
    // }

    // confirmVerifikasi = () => {
    //     this.setState({isVerified: true});
    //     this.setState({isVerifikasi: false});
    //     // this.setState({status: "1"})
    // }

    // confirmTolakVerifikasi = () => {
    //     this.setState({isTolakVerifikasi: false});
    //     this.setState({isDeclined: true});
    // }

    // closeModal = () => {
    //     this.setState({isVerifikasi: false});
    //     this.setState({isTolakVerifikasi: false});
    //     this.setState({isVerified: false});
    //     this.setState({isDeclined: false});
    // }

    // // render() {
    // //     const status = this.state.status;
    // //     let verifiedTag;
    // //     if (status === "1") {
    // //         verifiedTag = <Button className="rounded-pill ms-auto mb-auto" variant="success">Sudah Diverifikasi</Button>;
    // //     } else if (status === "2") {
    // //         verifiedTag = <Button className="rounded-pill ms-auto mb-auto" variant="danger">Verifikasi Ditolak</Button>;
    // //     }

    //     return (
    //         <Container>
    //             <h3 className="text-section-header px-0"><span class="pull-right"><LibraryBooksIcon className="mr-2" fontSize="large"></LibraryBooksIcon></span>Permintaan Verifikasi Karya Ilmiah</h3>
                
    //             <Card>
    //                 <Card.Body>
    //                     <Card.Subtitle className="mb-2">Card Subtitle</Card.Subtitle>
    //                     <Card.Title>Card Title</Card.Title>
    //                     <Card.Subtitle className="mt-1 mb-1 text-muted">Card Subtitle</Card.Subtitle>
    //                     <Card.Text>
    //                     Some quick example text to build on the card title and make up the bulk of
    //                     the card's content.
    //                     </Card.Text>

    //                     <Stack direction="horizontal" gap={3}>
    //                         <Card.Link href=""><span><FileDownloadOutlinedIcon/></span>Unduh PDF</Card.Link>
    //                         <Card.Link href="">Abstrak<span><ExpandMoreIcon/></span></Card.Link>
                        
    //                         <Button className="ms-auto" variant="outline-danger" onClick={this.showTolakVerifikasi}>Tolak verifikasi</Button>
    //                         <Button variant="success" onClick={this.showVerifikasi}>Verifikasi</Button>
    //                     </Stack>
    //                 </Card.Body>
    //             </Card>

    //             {this.state.listNotVerified.map((nv, idx) => 
    //                 <Stack gap={3} my={3} key={idx}>
    //                     <CardNotVerified data={nv}/>
    //                 </Stack>    
    //             )}
                
    //             <Modal show={this.state.isVerifikasi} onHide={this.closeModal}>
    //                 <ModalHeader>
    //                     <h5 className="modal-title">Apakah Anda yakin
    //                         ingin memverifikasi karya ilmiah ini?</h5>
    //                 </ModalHeader>
    //                 <ModalFooter>
    //                     <button type="button" className="btn btn-primary" onClick={this.closeModal}>Batal</button>
    //                     <button type="button" className="btn btn-primary" onClick={this.confirmVerifikasi}>Ya</button>
    //                 </ModalFooter>
    //             </Modal>

    //             <Modal show={this.state.isTolakVerifikasi} onHide={this.closeModal}>
    //                 <ModalHeader>
    //                     <h5 className="modal-title">Apakah Anda yakin
    //                         ingin menolak verifikasi karya ilmiah ini?</h5>
    //                 </ModalHeader>
    //                 <ModalFooter >
    //                     <button type="button" className="btn btn-primary" onClick={this.closeModal}>Batal</button>
    //                     <button type="button" className="btn btn-primary" onClick={this.confirmTolakVerifikasi}>Ya</button>
    //                 </ModalFooter>
    //             </Modal>

    //             <Modal show={this.state.isVerified} isActive={this.confirmVerifikasi} onHide={this.closeModal}>
    //                 <ModalHeader>
    //                     <bold><h5 className="modal-title">Sukses!</h5></bold>
    //                     <h4 type="button" onClick={this.closeModal}>
    //                         <span aria-hidden="true">&times;</span>
    //                     </h4>
    //                 </ModalHeader>
    //                 <ModalBody>
    //                     <p>Karya ilmiah berhasil diverifikasi dan kini dapat diakses oleh seluruh pengguna.</p>
    //                 </ModalBody>
    //             </Modal>

    //             <Modal show={this.state.isDeclined} isActive={this.confirmTolakVerifikasi} onHide={this.closeModal}>
    //                 <ModalHeader>
    //                     <bold><h5 className="modal-title">Permintaan verifikasi ditolak</h5></bold>
    //                     <h4 type="button" onClick={this.closeModal}>
    //                         <span aria-hidden="true">&times;</span>
    //                     </h4>
    //                 </ModalHeader>
    //                 <ModalBody>
    //                     <p>Permintaan verifikasi karya ilmiah ditolak. Karya ilmiah tidak dapat diakses oleh seluruh pengguna.</p>
    //                 </ModalBody>
    //             </Modal>

    //             <h3 className="text-section-header px-0 mt-5"><span class="pull-right"><CheckCircleOutlineRoundedIcon fontSize="large"></CheckCircleOutlineRoundedIcon></span>Daftar Karya Ilmiah Terverifikasi</h3>

    //             <div>
    //                 <Stack direction="horizontal" gap={3} className="mb-3 mt-3">
    //                     {this.state.isSemua === true ? (
    //                         <Button className="rounded-pill" variant="primary" onClick={this.semuaTagControl}>Lihat Semua</Button>
    //                     ):
    //                         <Button className="rounded-pill" variant="outline-primary" onClick={this.semuaTagControl}>Lihat Semua</Button>
    //                     }
    //                     {this.state.isDiterima === false ? (
    //                         <Button className="rounded-pill" variant="outline-primary" onClick={this.diterimaTagControl}>Sudah diverifikasi</Button>
    //                     ):
    //                         <Button className="rounded-pill" variant="primary" onClick={this.diterimaTagControl}>Sudah diverifikasi</Button>
    //                     }
    //                     {this.state.isDitolak === false ? (
    //                         <Button className="rounded-pill" variant="outline-primary" onClick={this.ditolakTagControl}>Verifikasi ditolak</Button>
    //                     ):
    //                         <Button className="rounded-pill" variant="primary" onClick={this.ditolakTagControl}>Verifikasi ditolak</Button>
    //                     }
    //                     <a href="" className="ms-auto">Lihat Semua</a>
    //                 </Stack>
    //             </div>

    //             <Stack gap={3}>
    //             <Card status={status}>
    //                 <Card.Body>
    //                     <Stack direction="horizontal" gap={3} className="mb-3">
    //                         <Stack>
    //                             <Card.Subtitle className="mb-2">Card Subtitle</Card.Subtitle>
    //                             <Card.Title>Card Title</Card.Title>
    //                             <Card.Subtitle className="mt-1 mb-1 text-muted">Card Subtitle</Card.Subtitle>
    //                             <Card.Text>
    //                                 Some quick example text to build on the card title and make up the bulk of
    //                                 the card's content.
    //                             </Card.Text>
    //                         </Stack>
    //                     {verifiedTag}
    //                     </Stack>
    //                 </Card.Body>
    //             </Card>
    //             </Stack>                
                

    //         </Container>
    //     )
    // }
// }