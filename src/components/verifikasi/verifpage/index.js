import React, {Component, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Container from 'react-bootstrap/Container'
import CardNotVerified from "../card-notverified.component";
import CardKarilStatus from "../card-karilstatus.component";
import Dasbor from "../../dasbor";
import axios from "axios";
import hands_phone from '../../../hands_phone.svg'; 
import { Pagination } from "@material-ui/lab";
import classes from "../styles.module.css";
import CustomButton from "../../custom-button";

const DaftarVerifikasi = () => {
    const [listToVerify, setListToVerify] = useState([]);
    const [listVerified, setListVerified] = useState([]);
    const [listDeclined, setListDeclined] = useState([]);
    const [frontListToVerify, setFrontListToVerify] = useState([]);
    const [status, setStatus] = useState();
    const [checker, setChecker] = useState({
        isSemua: true,
        isDiterima: false,
        isDitolak: false,
        showVerifikasi: false,
        showTolakVerifikasi: false,
        confVerified: false,
        confDeclined: false,
        totalPage: 0,
    })
    const { isSemua, isDiterima, isDitolak } = checker;

    useEffect(() => {
        fetchKarilToVerify();
        fetchKarilVerified();
        fetchKarilDeclined();
    }, [checker])

    const fetchKarilToVerify = async () => {
        let status = "0";
        const url = `api/daftar-verifikasi/?status=${status}`
        axios.get(url).then(response => {
            setListToVerify(response.data.reverse());
            console.log(listToVerify)
        // var total_page = 0;
        // if(listToVerify.length/3 - Math.round(listToVerify.length/3) > 0){
        //     total_page = Math.round(listToVerify.length/3) + 1
        // }else{
        //     total_page = Math.round(listToVerify.length/5)
        // }
        // this.setState({ totalPage:total_page, frontListToVerify: listToVerify.slice(0,3)});
        }).catch((error) => {
            console.log(error);
        });
    }

    const fetchKarilVerified = async () => {
        let status = "1";
        const url = `api/daftar-verifikasi/?status=${status}`
        axios.get(url).then(response => {
            setListVerified(response.data);
        }).catch((error) => {
            console.log(error);
        });
        console.log(url)
    }
    
    const fetchKarilDeclined = async () => {
        let status = "2";
        const url = `api/daftar-verifikasi/?status=${status}`
        axios.get(url).then(response => {
            setListDeclined(response.data);
            console.log(listToVerify)
        }).catch((error) => {
            console.log(error);
        });
    }

    const statusConfirmed = listVerified.concat(listDeclined);

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

    // const handleChangePage = (value) => {

    //     var toVerify = this.state.listToVerify;
    //     toVerify = toVerify.slice((3*value)-3, 3*value)
    //     console.log(toVerify)
    //     this.setState({frontListToVerify:toVerify})
    //     // document.getElementById("judul").scrollIntoView();
    //     console.log(this.state.frontListToVerify)
    //     console.log(this.state.listToVerify)
    // };
    

    return(
        <Dasbor>
            <Container className="pt-4 mt-4">
                <h3 className="text-section-header px-0"><span class="pull-right"><LibraryBooksIcon className="pl-0 mx-4" fontSize="large"></LibraryBooksIcon></span>Permintaan Verifikasi Karya Ilmiah</h3>
                
                <Box>
                {listToVerify.length === 0 ? (
                    <div className="text-center m-5">
                        <Container className="text-center">
                            <img
                                src={hands_phone}
                                width="213"
                                height="141"
                                className=""
                                alt="Hands Phone"/>
                            <h5><b>Belum ada karya ilmiah untuk diverifikasi</b></h5>
                        </Container>
                    </div>
                ):
                    <Box>
                        {listToVerify.map((toVerify, i) =>
                            <Box my={3} key={i} >
                                <CardNotVerified className="p-0" data={toVerify}/>
                            </Box>
                        )}
                    </Box>
                }
                </Box> 

                {/* <Pagination onChange={this.handleChangePage} count={this.state.totalPage} size="large" class="d-flex justify-content-center" */}
                {/* id={classes["pagination"]}/> */}

                <h3 className="text-section-header px-0 mt-5"><span class="pull-right"><CheckCircleOutlineRoundedIcon fontSize="large" className="pl-0 mx-4"></CheckCircleOutlineRoundedIcon></span>Daftar Karya Ilmiah Terverifikasi</h3>
                
                <div>
                    <Stack direction="horizontal" gap={3} className="my-4">
                        {isSemua === false ? (
                            <CustomButton variant="tab-inactive" action={semuaTagControl}>Lihat Semua</CustomButton>
                        ):
                            <CustomButton variant="tab-active" action={semuaTagControl}>Lihat Semua</CustomButton>
                        }
                        {isDiterima === false ? (
                            <CustomButton variant="tab-inactive" action={diterimaTagControl}>Sudah diverifikasi</CustomButton>
                        ):
                            <CustomButton variant="tab-active" action={diterimaTagControl}>Sudah diverifikasi</CustomButton>
                        }
                        {isDitolak === false ? (
                            <CustomButton variant="tab-inactive" action={ditolakTagControl}>Verifikasi ditolak</CustomButton>
                        ):
                            <CustomButton variant="tab-active">Verifikasi ditolak</CustomButton>
                        }
                        <a href="#/DaftarVerifikasi/lihat-semua" className="ms-auto text-orange">Lihat Semua</a>
                    </Stack>
                </div>

                {statusConfirmed.length === 0 ? (
                    <div className="text-center m-5">
                        <Container className="text-center">
                            <img
                                src={hands_phone}
                                width="213"
                                height="141"
                                className=""
                                alt="Hands Phone"/>
                            <h5><b>Belum ada karya ilmiah untuk terverifikasi</b></h5>
                        </Container>
                    </div>
                ):
                    <div>
                        {isSemua === false ? (
                            null
                        ):
                            <Box>
                                {statusConfirmed.map((c, i) =>
                                    <Box my={3} key={i}>
                                        <CardKarilStatus data={c}/>
                                    </Box>
                                )}
                            </Box>
                        }
                        {isDiterima === false ? (
                            null 
                        ):
                            <Box>
                                {listVerified.map((c, i) =>
                                    <Box my={3} key={i}>
                                        <CardKarilStatus data={c}/>
                                    </Box>
                                )}
                            </Box>  
                        }
                        {isDitolak === false ? (
                            null
                        ):
                            <Box>
                                {listDeclined.map((c, i) =>
                                    <Box my={3} key={i}>
                                        <CardKarilStatus data={c}/>
                                    </Box>
                                )}
                            </Box>
                        }   
                    </div>
                }

                {/* <Box>
                {statusConfirmed.map((c, i) =>
                    <Box my={3} key={i}>
                        <CardKarilStatus data={c}/>
                    </Box>
                )}
                </Box> */}

            </Container>
        </Dasbor>
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

    // render() {
    //     const status = this.state.status;
    //     let verifiedTag;
    //     if (status === "1") {
    //         verifiedTag = <Button className="rounded-pill ms-auto mb-auto" variant="success">Sudah Diverifikasi</Button>;
    //     } else if (status === "2") {
    //         verifiedTag = <Button className="rounded-pill ms-auto mb-auto" variant="danger">Verifikasi Ditolak</Button>;
    //     }

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
    // //                         ingin memverifikasi karya ilmiah ini?</h5>
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