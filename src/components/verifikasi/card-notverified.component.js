import React, {Component, useState} from "react";
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConfirmationPopUp from '../modals/confirmation-pop-up';
import Container from 'react-bootstrap/Container'
import SuccessModalWithButton from "../modals/success-modal-with-button";
import SuccessModalWithHide from "../modals/success-modal-with-hide";
import axios from "axios";
import classes from "./styles.module.css";
import {BoxArrowDown} from "react-bootstrap-icons";
import fileDownload from "js-file-download";
import AuthenticationDataService from "../../services/authentication.service";

const CardNotVerified = ({data}) => {

    const [status, setStatus] = useState("0");
    const [showVerifikasi, setShowVerifikasi] = useState(false);
    const [showTolak, setShowTolak] = useState(false);
    const [confVerifikasi, setConfVerifikasi] = useState(false);
    const [confTolak, setConfTolak] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [successModalUnduh, setSuccessModalUnduh] = useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    const handlePDFDownload = () => {
        console.log("masuk pdf ")
        setIsOpen(false)
        try {
            let token = localStorage.getItem("ssoui");
            token = JSON.parse(token);
            AuthenticationDataService.profile(token)
                .then(response => {
                    console.log('get profile & fill state')
                    console.log(response)
                    try {
                        axios.post('/api/daftarUnduhan', {
                            'karyaIlmiah': data.id,
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

        axios.get('/api/download/'+ data.fileURI, {
            responseType: 'blob',
        }).then(res => {
            console.log('get the pdf file from cloud')
            fileDownload(res.data, data.judul+'.pdf');
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        setSuccessModalUnduh(true)
    };

    const handleShowVerifikasi = () => {
        setShowVerifikasi(true);
    }

    const handleShowTolak = () => {
        setShowTolak(true);
    }

    const handleConfirmVerifikasi = () => {
        setConfVerifikasi(true);
        setShowVerifikasi(false);
    }

    const handleConfirmTolak = () => {
        setConfTolak(true);
        setShowTolak(false);
    }

    const handleCloseModal = () => {
        setConfTolak(false);
        setConfVerifikasi(false);
        setShowTolak(false);
        setShowVerifikasi(false);
        window.location.reload();
    }

    // const handleVerifikasi = async() => {
    //     console.log("sebelum: ", status)
    //     setStatus("1");
    //     console.log("sesudah: ", status)
    //     handleSubmit();
    // }

    // const handleTolak = () => {
    //     console.log("sebelum: ", status)
    //     setStatus("2");
    //     console.log("sesudah: ", status)
    //     handleSubmit();
    // }

    const handleVerifikasi = async() => {
        // event.preventDefault();

        try {
            setShowVerifikasi(false);

            let formData = new FormData();
            formData.append('status', "1");

            const res = await axios.put(
                "/api/edit-status/" + data.id ,
                formData,
                { headers: {
                    'content-type': 'multipart/form-data'
                }
                }
            )
            
            setConfVerifikasi(true);
        } catch (error) {
            alert("Terjadi error di server. Mohon tunggu beberapa saat.");
        }
    }

    const handleTolak = async() => {
            // event.preventDefault();
    
        try {
            setShowTolak(false);

            let formData = new FormData();
            formData.append('status', "2");

            const res = await axios.put(
                "/api/edit-status/" + data.id ,
                formData,
                { headers: {
                    'content-type': 'multipart/form-data'
                }
                }
            )
            
            setConfTolak(true);
        } catch (error) {
            alert("Terjadi error di server. Mohon tunggu beberapa saat.");
        }
    }

    return (
        <div>
            <Card className={classes.cardkaril}>
                <Card.Body>
                    <Card.Subtitle className="mb-2">{data.jenis}</Card.Subtitle>
                    <Card.Title><Link to={`/KaryaIlmiah/${data.id}`} className="link">{data.judul}</Link></Card.Title>
                    {/* <Card.Subtitle className="mt-1 mb-1 text-muted">Card Subtitle</Card.Subtitle> */}
                    <Card.Text>{data.author}</Card.Text>

                    <Stack direction="horizontal" gap={3}>
                        <a className={classes.unduh} id={classes["features"]} onClick={showModal}>
                            <BoxArrowDown/> &nbsp;Unduh PDF
                        </a>
                    
                        <Button className="ms-auto" variant="outline-danger" onClick={handleShowTolak}>Tolak verifikasi</Button>
                        <Button variant="success" onClick={handleShowVerifikasi}>Verifikasi</Button>
                    </Stack>
                </Card.Body>
            </Card>

            <ConfirmationPopUp action={() => handlePDFDownload()}
                show={isOpen}
                hide={hideModal}
                title="Apakah anda yakin
                ingin mengunduh karya ilmiah ini?"
                content="Penulis karya ilmiah, dosen pembimbing terkait, serta staf akan dapat
                melihat bahwa anda telah mengunguh karya ilmiah ini.">
            </ConfirmationPopUp>

            <ConfirmationPopUp
                action={handleVerifikasi}
                show={showVerifikasi}
                hide={handleCloseModal}
                title="Apakah Anda yakin ingin memverifikasi karya ilmiah ini?"
                content="">
            </ConfirmationPopUp>

            <ConfirmationPopUp
                action={handleTolak}
                show={showTolak}
                hide={handleCloseModal}
                title="Apakah Anda yakin ingin menolak verifikasi karya ilmiah ini?"
                content="">
            </ConfirmationPopUp>

            <SuccessModalWithHide
                show={confVerifikasi}
                hide={handleCloseModal}
                title="Karya ilmiah berhasil diverifikasi!"
                content=""
                buttonText="Kembali">
            </SuccessModalWithHide>

            <SuccessModalWithHide
                show={confTolak}
                hide={handleCloseModal}
                title="Verifikasi Karya ilmiah berhasil ditolak!"
                content=""
                buttonText="Kembali">
            </SuccessModalWithHide>

        </div>
    )
}

export default CardNotVerified;