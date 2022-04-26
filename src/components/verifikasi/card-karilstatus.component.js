import React, {Component, useState} from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from 'react-bootstrap/Container'

const CardKarilStatus = ({data}) => {

        const status = data.status;
        let verifiedTag;
        if (status === "1") {
            verifiedTag = <Button className="rounded-pill ms-auto mb-auto" variant="success">Sudah Diverifikasi</Button>;
        } else if (status === "2") {
            verifiedTag = <Button className="rounded-pill ms-auto mb-auto" variant="danger">Verifikasi Ditolak</Button>;
        }

        return (
            <Card status={status}>
                <Card.Body>
                <Stack direction="horizontal" gap={3} className="mb-3">
                    <Stack>
                        <Card.Subtitle className="mb-2">{data.jenis}</Card.Subtitle>
                        <Card.Title>{data.judul}</Card.Title>
                        <Card.Text className="mt-1 mb-1 text-muted">{data.author}</Card.Text>

                        <Stack className="mt-1" direction="horizontal" gap={3}>
                            <Card.Link href=""><span><FileDownloadOutlinedIcon/></span>Unduh PDF</Card.Link>
                            <Card.Link href="">Abstrak<span><ExpandMoreIcon/></span></Card.Link>
                        </Stack>
                    </Stack>
                {verifiedTag}
                </Stack>
                </Card.Body>
            </Card>
        )
}

export default CardKarilStatus;