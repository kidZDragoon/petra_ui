import React, {useState} from "react";
import '../../index.css';
import Card from "react-bootstrap/Card";
import {BoxArrowDown} from "react-bootstrap-icons";
import classes from "./styles.module.css";
import {Link, useNavigate} from "react-router-dom";
import {browserHistory} from 'react-router'
import axios from "axios";
import { Container, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import Stack from 'react-bootstrap/Stack';
import {FaEdit} from "react-icons/fa";
import {RiDeleteBin6Fill} from "react-icons/ri";
import Grid from '@mui/material/Grid';
import ConfirmationPopUp from '../modals/confirmation-pop-up';
import SuccessModalWithHide from "../modals/success-modal-with-hide";
import TagVerifikasi from "../modals/tag-verifikasi";
import { MoreHoriz } from "@mui/icons-material";

var fileDownload = require('js-file-download');

const CardKaril = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [successModalUnduh, setSuccessModalUnduh] = useState(false);
  const [successModalDelete, setSuccessModalDelete] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  
  const handleEdit = () => {
    navigate(`/edit-karil/${data.id}`)
  }
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    handleClose()
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
            <div className="mx-3">
            <TagVerifikasi status={data.status}/>
            </div>
            <div>
              <IconButton
                aria-label="more"
                id="more-button"
                aria-controls={open ? 'more-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
              <MoreHoriz />
              </IconButton>
              <Menu
                id="more-menu"
                aria-labelledby="more-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                <MenuItem onClick={() => handleEdit()}>
                  <ListItemIcon>
                    <FaEdit size={24}/>
                  </ListItemIcon>
                  Edit
                </MenuItem>

                <MenuItem onClick={openDeleteButton}>
                  <ListItemIcon>
                    <RiDeleteBin6Fill size={24}/>
                  </ListItemIcon>
                  Delete
                </MenuItem>
              </Menu>
            </div>
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
