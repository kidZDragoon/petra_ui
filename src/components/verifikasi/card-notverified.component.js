import React, {Component, useState} from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConfirmationPopUp from '../modals/confirmation-pop-up';
import Container from 'react-bootstrap/Container'
import SuccessModalWithButton from "../modals/success-modal-with-button";

const CardNotVerified = ({data}) => {

    const [showVerifikasi, setShowVerifikasi] = useState(false);
    const [showTolak, setShowTolak] = useState(false);
    const [confVerifikasi, setConfVerifikasi] = useState(false);
    const [confTolak, setConfTolak] = useState(false);

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
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Subtitle className="mb-2">{data.jenis}</Card.Subtitle>
                    <Card.Title>{data.judul}</Card.Title>
                    {/* <Card.Subtitle className="mt-1 mb-1 text-muted">Card Subtitle</Card.Subtitle> */}
                    <Card.Text>{data.author}</Card.Text>

                    <Stack direction="horizontal" gap={3}>
                        <Card.Link href=""><span><FileDownloadOutlinedIcon/></span>Unduh PDF</Card.Link>
                        <Card.Link href="">Abstrak<span><ExpandMoreIcon/></span></Card.Link>
                    
                        <Button className="ms-auto" variant="outline-danger" onClick={handleShowTolak}>Tolak verifikasi</Button>
                        <Button variant="success" onClick={handleShowVerifikasi}>Verifikasi</Button>
                    </Stack>
                </Card.Body>
            </Card>

            <ConfirmationPopUp
                action={handleConfirmVerifikasi}
                show={showVerifikasi}
                hide={handleCloseModal}
                title="Apakah Anda yakin ingin memverifikasi karya ilmiah ini?"
                content="">
            </ConfirmationPopUp>

            <ConfirmationPopUp
                action={handleConfirmTolak}
                show={showTolak}
                hide={handleCloseModal}
                title="Apakah Anda yakin ingin menolak verifikasi karya ilmiah ini?"
                content="">
            </ConfirmationPopUp>

            <SuccessModalWithButton
                show={confVerifikasi}
                hide={handleCloseModal}
                title="Karya ilmiah berhasil diverifikasi!"
                content=""
                buttonText="Lihat daftar verifikasi">
            </SuccessModalWithButton>

            <SuccessModalWithButton
                show={confTolak}
                hide={handleCloseModal}
                title="Verifikasi Karya ilmiah berhasil ditolak!"
                content=""
                buttonText="Lihat daftar verifikasi">
            </SuccessModalWithButton>

        </Container>
    )
}

export default CardNotVerified;