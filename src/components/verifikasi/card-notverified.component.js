import React, {Component} from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CardNotVerified = ({data}) => {

    return (
        <Card>
            <Card.Body>
                <Card.Subtitle className="mb-2">{data.jenis}</Card.Subtitle>
                <Card.Title>{data.judul}</Card.Title>
                {/* <Card.Subtitle className="mt-1 mb-1 text-muted">Card Subtitle</Card.Subtitle> */}
                <Card.Text>{data.author}</Card.Text>

                <Stack direction="horizontal" gap={3}>
                    <Card.Link href=""><span><FileDownloadOutlinedIcon/></span>Unduh PDF</Card.Link>
                    <Card.Link href="">Abstrak<span><ExpandMoreIcon/></span></Card.Link>
                
                    {/* <Button className="ms-auto" variant="outline-danger" onClick={data.showTolakVerifikasi}>Tolak verifikasi</Button>
                    <Button variant="success" onClick={data.showVerifikasi}>Verifikasi</Button> */}
                </Stack>
            </Card.Body>
        </Card>
    )
}

export default CardNotVerified;