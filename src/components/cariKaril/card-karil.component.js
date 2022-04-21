import React, {useState} from "react";
import '../../index.css';
import Card from "react-bootstrap/Card";
import {BoxArrowDown} from "react-bootstrap-icons";
import classes from "./styles.module.css";
import {Link} from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal'
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import { Container } from "@mui/material";
import Stack from 'react-bootstrap/Stack';
import {Heart} from "react-bootstrap-icons";
import {HeartFill} from "react-bootstrap-icons";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {FaEdit} from "react-icons/fa";
import {RiDeleteBin6Fill} from "react-icons/ri";
import Grid from '@mui/material/Grid';
import ConfirmationPopUp from '../modals/confirmation-pop-up';
import SuccessModalWithHide from "../modals/success-modal-with-hide";
import SuccessModalWithButton from "../modals/success-modal-with-button";


var fileDownload = require('js-file-download');

const CardKaril = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [successModalUnduh, setSuccessModalUnduh] = useState(false);
  const [successModalDelete, setSuccessModalDelete] = useState(false);
  
  const handlePDFDownload = () => {
    console.log("masuk pdf ")
    setIsOpen(false)
    axios.get('api/download/'+ data.fileURI, { 
        responseType: 'blob',
    }).then(res => {
        fileDownload(res.data, data.judul +'.pdf');
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

  const favoriteControl = () => {
    setIsFavorite(!isFavorite);
    console.log(isFavorite);
  };

  const openDeleteButton = () => {
    setIsOpenDelete(true)
  }

  

  const hideDeleteButton = () => {
    setIsOpenDelete(false)
  }

  const hideSuccessModal = () => {
    setSuccessModalDelete(false)
    window.location.reload(false);
  }

  const handleDelete = () => {
      try {
          setIsOpenDelete(false)
          axios.delete("/api/delete/" + data.id);
          setSuccessModalDelete(true)
      }
      catch (error) {
          alert("Oops terjadi masalah pada server");
      }
  }

  return (
    <div>
    <Card className={classes.cardkaril}>
      <Card.Body>
        {/* <Stack direction="horizontal" gap={5} className="mb-3"> */}
        <Grid container spacing={2}>
          <Stack>
            <Card.Subtitle className="mb-2 text-muted">{data.jenis}</Card.Subtitle>
            <Card.Title><Link to={`/KaryaIlmiah/${data.id}`} className="link">{data.judul}</Link></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{data.tglDisetujui}</Card.Subtitle>
            <Card.Text>{data.author}</Card.Text>
            <button id={classes["features"]} onClick={showModal}>
              <BoxArrowDown/> &nbsp;Unduh PDF
            </button>
          </Stack>

          {/* {isFavorite === false ? (
            <button id={classes["features"]} onClick={favoriteControl}>
                <Heart size={24}/>
            </button>
            ):
            <button id={classes["features"]} onClick={favoriteControl}>
                <HeartFill size={24}/>
            </button>
          }   */}

          <div className="d-flex">
              <Link to={`/edit-karil/${data.id}`} id={classes["editbutton"]}>
                  <FaEdit size={24}/>
              </Link>
              <button id={classes["deletebutton"]} onClick={openDeleteButton}>
                  <RiDeleteBin6Fill size={24}/>
              </button>
          </div>
          
        {/* </Stack> */}
        </Grid>
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

    <ConfirmationPopUp action={handleDelete}
        show={isOpenDelete}
        hide={hideDeleteButton}
        title="Apakah Anda yakin ingin menghapus karya ilmiah ini?"
        content="">
    </ConfirmationPopUp>

    <SuccessModalWithHide show={successModalDelete}
        hide={hideSuccessModal}
        title="Karya ilmiah berhasil dihapus!"
        content=""
        buttonText="Lihat daftar karya ilmiah">
    </SuccessModalWithHide>

    </Container>
    </div>
  );
};

export default CardKaril;
