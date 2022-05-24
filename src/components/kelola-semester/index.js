import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import classes from "./styles.module.css";
import axios from "axios";
import { Form } from "react-bootstrap";
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'react-bootstrap'
import SuccessModalWithButton from "../modals/success-modal-with-button";
import Dasbor from "../dasbor";
import {Container, Typography, Box} from "@mui/material"
import CustomButton from "../custom-button";
import SuccessModalWithHide from "../modals/success-modal-with-hide";
import Button from 'react-bootstrap/Button'
import AddIcon from '@mui/icons-material/Add';


const KelolaSemester = () => {
    const [listSemester, setListSemester] = useState([]);
    const [semesterInput, setSemesterInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [successModal, setSuccessModal] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [loadPage, setLoadPage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSemesterData();
      },[loadPage])

    const getSemesterData = async () => {
        axios.get(`api/get-semester-data`)
        .then(response => {
            setListSemester(response.data.data);
            setIsLoading(false);
        })
        .catch((error) => {
            alert("Oops terjadi masalah pada server");
        });
    }

    const handleChangeField = (event) =>  {
       setSemesterInput(event.target.value);
    }

    const showFormModal = (usr) => {
       setFormModal(true);
    };

    const hideFormModal = () => {
       setFormModal(false);
    };

    const showSuccessModal = () => {
        setSuccessModal(true);
    }

    const hideSuccessModal = () => {
        setSuccessModal(false);
        setSemesterInput("");
        setErrorMessage("");
        setLoadPage(true);
    };

    const submitData = (event) =>  {
        event.preventDefault();
        if(semesterInput === ""){
            setErrorMessage("Mohon isi semester");
        } else if (!(semesterInput.toLowerCase().startsWith("semester gasal") || semesterInput.toLowerCase().startsWith("semester genap"))) {
            setErrorMessage("Pastikan format penulisan semester sesuai contoh di atas");
        } else if (semesterInput.trim().split(/\s+/)[2].length != 9){
            setErrorMessage("Pastikan format penulisan semester sesuai contoh di atas");
        } 
        else {
            let hasVal = false;
           
            for (let key in listSemester) { 
                if (listSemester[key].semester === semesterInput) { 
                    hasVal = true; 
                    break; 
                }
            }

            if(hasVal){
                setErrorMessage("Semester sudah ada di database");

            } else {
                try {
                    let formData = new FormData();
                    formData.append('semester', semesterInput);
        
                    const res = axios.post(
                            "/api/get-semester-data/",
                            formData,
                            { headers: {
                                'content-type': 'multipart/form-data'
                            }
                            }
                        )

                    hideFormModal()
                    showSuccessModal()
                    setSuccessMessage(`Semester  + ${semesterInput} berhasil ditambahkan`);    
                }
                    
                catch (error) {
                    alert("Terjadi error di server. Mohon tunggu beberapa saat.");
                }
            }
        }
    }

    return (
        <Dasbor>
            <Box py={6} px={8} id={classes["container"]}>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    }}
                >
                    <Typography fontFamily="Mulish" fontWeight={900} fontSize={28}>
                        Kelola Semester
                    </Typography>

                    <CustomButton action={showFormModal} variant="primary">
                      <AddIcon/>&nbsp;Tambah Semester
                    </CustomButton>

                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    width: '100%',
                    }}
                >
                    <table className="table table-borderless mt-4" >
                        <thead>
                        <tr className="d-flex" id={classes["tabelHeader"]}>
                            <th className="col-1">No</th>
                            <th className="col-3">Semester</th>
                        </tr>
                        </thead>

                        <tbody>
                            {listSemester.map((smt, index) => (
                                <tr className="d-flex" key={index}>
                                    <td className="col-1">{index += 1}</td>
                                    <td className="col-3">{smt.semester}</td>
                                </tr>
                            ))} 
                        </tbody>

                    </table>

                </Box>

                 {/* TAMBAH SEMESTER MODAL */}
                 <Modal className={classes.modal}  show={formModal} onHide={hideFormModal}>
                    <ModalHeader className={classes.modalHeader}>
                        <h5 className={classes.modalTitle} id="exampleModalLongTitle">Tambah Semester</h5>
                        <h4 type="button" className={classes.close} onClick={hideFormModal}>
                            <span aria-hidden="true">&times;</span>
                        </h4>
                    </ModalHeader>
                    <ModalBody className={classes.modalBody}>
                        <Form.Group className="" id="input-semester">
                            <Form.Label className="text-large">Judul semester</Form.Label>
                            <p className="text-charcoal text-small">
                                    Contoh: Semester Genap 2021/2022 atau Semester Gasal 2021/2022
                            </p>
                            <Form.Control type="text" name="author" placeholder="Semester"
                            value={semesterInput} onChange={handleChangeField}/>
                            <span className="text-error text-small">
                                {errorMessage}
                            </span>
                        </Form.Group>
                    </ModalBody>
                    <ModalFooter className={classes.modalFooter}>
                        <button type="button" className="btn btn-primary cancel" onClick={hideFormModal}
                                id={classes["cancle"]}>Batal</button>
                        <button type="button" className="btn btn-primary accept" id={classes["submit"]}
                        onClick={submitData}>Tambah</button>
                    </ModalFooter>
                </Modal>
                

                {/* SUCCESS MODAL */}
                <SuccessModalWithHide show={successModal}
                                hide={hideSuccessModal}
                                title="Berhasil!"
                                content="Semester berhasil ditambahkan"
                                buttonText="OK"
                                >
                </SuccessModalWithHide>
            
            </Box>
        </Dasbor>
    )
}


export default KelolaSemester;
