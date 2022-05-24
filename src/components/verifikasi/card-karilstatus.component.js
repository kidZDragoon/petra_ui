import React, {Component, useState} from "react";
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container'
import AuthenticationDataService from "../../services/authentication.service";
import axios from "axios";
import fileDownload from "js-file-download";
import classes from "./styles.module.css";
import {BoxArrowDown} from "react-bootstrap-icons";
import ConfirmationPopUp from "../modals/confirmation-pop-up";
import SuccessModalWithHide from "../modals/success-modal-with-hide";


const CardKarilStatus = ({data}) => {
        const [isOpen, setIsOpen] = useState(false);
        const [successModalUnduh, setSuccessModalUnduh] = useState(false);
        const status = data.status;
        let verifiedTag;
        if (status === "1") {
            verifiedTag = <Button className="rounded-pill ms-auto mb-auto" variant="success">Sudah Diverifikasi</Button>;
        } else if (status === "2") {
            verifiedTag = <Button className="rounded-pill ms-auto mb-auto" variant="danger">Verifikasi Ditolak</Button>;
        } else {
            verifiedTag = <Button className="rounded-pill ms-auto mb-auto" variant="warning">Menunggu Verifikasi</Button>;
        }

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



        const showModal = () => {
        setIsOpen(true);
        };
        const hideModal = () => {
        setIsOpen(false);
        };

        const hideSuccessUnduh = () => {
        setSuccessModalUnduh(false)
        };

        return (
            <div>
            <Card className={classes.cardkaril} status={status}>
                <Card.Body>
                <Stack direction="horizontal" gap={3} className="mb-3">
                    <Stack>
                        <Card.Subtitle className="mb-2">{data.jenis}</Card.Subtitle>
                        {/* <Card.Title>{data.judul}</Card.Title> */}
                        <Card.Title><Link to={`/KaryaIlmiah/${data.id}`} className="link">{data.judul}</Link></Card.Title>
                        <Card.Text className="mt-1 mb-1 text-muted">{data.author}</Card.Text>
                        <a className={classes.unduh} id={classes["features"]} onClick={showModal}>
                          <BoxArrowDown/> &nbsp;Unduh PDF
                        </a>
                    </Stack>
                {verifiedTag}
                </Stack>
                </Card.Body>
            </Card>

            <Container>
            <ConfirmationPopUp action={() => handlePDFDownload()}
            show={isOpen}
            hide={hideModal}
            title="Apakah anda yakin
              ingin mengunduh karya ilmiah ini?"
            content="Penulis karya ilmiah, dosen pembimbing terkait, serta staf akan dapat
            melihat bahwa anda telah mengunguh karya ilmiah ini.">
            </ConfirmationPopUp>

            <SuccessModalWithHide show={successModalUnduh}
            hide={hideSuccessUnduh}
            title="Karya ilmiah berhasil diunduh!"
            content=""
            buttonText="Lihat daftar karya ilmiah">
            </SuccessModalWithHide>

            </Container>
            </div>
        )
}

export default CardKarilStatus;