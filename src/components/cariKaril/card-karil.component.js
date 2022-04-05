import React, {useState} from "react";
import '../../index.css';
import Card from "react-bootstrap/Card";
import Button from '@mui/material/Button';
import Row from "react-bootstrap/Row";
import {BoxArrowDown} from "react-bootstrap-icons";
import classes from "./styles.module.css";
import {Link} from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal'
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import { Container } from "@mui/material";
var fileDownload = require('js-file-download');

const CardKaril = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handlePDFDownload = () => {
    axios.get('api/download/'+ data.fileURI, { 
        responseType: 'blob',
    }).then(res => {
        fileDownload(res.data, data.judul +'.pdf');
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
  };

  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
    <Card style={{}}>
      <Card.Body>
        <Row>
          <Card.Subtitle className="mb-2 text-muted">{data.jenis}</Card.Subtitle>
          <Card.Title><Link to={`/KaryaIlmiah/${data.id}`} className="link">{data.judul}</Link></Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{data.tglDisetujui}</Card.Subtitle>
          <Card.Text>{data.author}</Card.Text>
        </Row>
        <Row>
          <button id={classes["features"]} onClick={showModal}>
            <BoxArrowDown/> &nbsp;Unduh PDF
          </button>
        </Row>
      </Card.Body>
    </Card>

    <Container>
    <Modal className={classes.modal} show={isOpen} onHide={hideModal}>
      <ModalHeader className={classes.modalHeader} >
          <h5 className="modal-title" id="exampleModalLongTitle">Apakah anda yakin
              ingin mengunduh karya ilmiah ini?</h5>
          <h4 type="button" className={classes.close}  onClick={hideModal}>
              <span aria-hidden="true">&times;</span>
          </h4>
      </ModalHeader>
      <ModalBody className={classes.modalBody}>
          Penulis karya ilmiah, dosen pembimbing terkait, serta staf akan dapat
          melihat bahwa anda telah mengunguh karya ilmiah ini.
      </ModalBody>
      <ModalFooter className={classes.modalFooter}>
          <button type="button" className="btn btn-primary" onClick={hideModal}
                  id={classes["cancle"]}>Batal</button>
          <button type="button" className="btn btn-primary" id={classes["accept"]}
          onClick={() => handlePDFDownload()}>Ya</button>
      </ModalFooter>
    </Modal>

    </Container>
    </div>
  );
};

export default CardKaril;
