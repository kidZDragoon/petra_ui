import React, {useEffect, useState} from "react";
import classes from './styles.module.css';
import '../../index.css';
import axios from "axios";
import "@fontsource/mulish";
import Dasbor from "../dasbor";     
import {
    Stack,
    Box,
    Button,
  } from "@mui/material";
import { Form } from "react-bootstrap";
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'react-bootstrap'
import SuccessModalWithButton from "../modals/success-modal-with-button";
import CardKaril from "../card/card-karil.component";
import profile_header from '../../profile_header.svg';  
import hands_phone from '../../hands_phone.svg';  
import SuccessModalWithHide from "../modals/success-modal-with-hide";

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [message, setMessage] = useState("");
  const [currentURL, setcurrentURL] = useState("");

  useEffect(() => {
    fetchProfile();
  },[])

  const fetchProfile = async () => {
    const pathname = window.location.href.split("/kelola-user/")[1];
    console.log(pathname);
    let url = `api/kelola-user/${pathname}`;
    setcurrentURL(url);
    console.log(url);
    axios.get(url)
      .then(response => {
        setUser(response.data);
        setSelectedRole(response.data.profile.role);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }


const handleChangeField = (event) =>{
    setSelectedRole(event.target.value);
};

const showModal = () =>{
    setIsOpen(true);
};

const hideModal = () => {
    setIsOpen(false);
};

const showSuccessModal = () => {
    setSuccessModal(true);
    setIsOpen(true);
    let message = `Role dari akun dengan nama ${user.profile.full_name} berhasil diubah menjadi ${selectedRole}`;
    setMessage(message);
};

const hideSuccessModal = () => {
    setSuccessModal(false);
    setIsOpen(false);
    fetchProfile();
    
};

const submitData = (event) => {
    event.preventDefault();
    console.log("name:"+user.profile.full_name)
    console.log("role:"+selectedRole)
    console.log("id:"+user.profile.id)

    let formData = new FormData();
    formData.append('id', user.profile.id);
    formData.append('full_name', user.profile.full_name);
    formData.append('user', user.profile.user);
    formData.append('org_code', user.profile.org_code);
    formData.append('role', selectedRole);
    formData.append('npm', user.profile.npm);
    formData.append('faculty',user.profile.faculty);
    formData.append('study_program', user.profile.study_program);
    formData.append('educational_program', user.profile.educational_program);

    const res = axios.put(
            "/api/profile/" + user.profile.id + "/",
            formData,
            { headers: {
                'content-type': 'multipart/form-data'
            }
            }
        )

    console.log("update success")

    hideModal()
    console.log("hide success")
    showSuccessModal()
    console.log("success success")
}

  return (
    <Dasbor className={classes.mainContent}>
        <Box>
            <img
            src={profile_header}
            width="100%"
            className="100%"
            alt="Profile header"/>

            <Box py={4} px={8}>
                {user.profile && user.role && user.karyaIlmiah ?
                    <Box>
                        <Box
                            sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            }}
                        >

                            <Box>
                                <p className="text-section-header px-0">
                                    {user.profile.full_name}
                                </p> 

                                <p className="text-large px-0">
                                    {user.email}
                                </p> 

                                <p className="text-large px-0">
                                    {user.role}
                                </p> 
                            </Box>

                            <Box>
                                <button 
                                    className={[classes.features, "mt-2"].join(' ')}  onClick={() => showModal(user.profile)}>Update Role
                                </button>

                            </Box>
                        </Box>
                    
                        <Box pt={4}>
                            <p className="text-bold-title px-0">
                                Daftar Unggahan
                            </p> 
                            
                            {user.karyaIlmiah.length === 0 ?
                                <Box 
                                    sx={{
                                        width: '100%',
                                        height: '20vh',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(248, 248, 248, 1)',
                                        borderRadius: '16px',
                                    }}
                                >
                                    <p class="text-large">{user.profile.full_name} belum memiliki karya ilmiah</p>
                                    
                                </Box>
                            : 
                                <Box>
                                    {user.karyaIlmiah.map((karil, idx) => 
                                    <Box my={3} key={idx}>
                                    <CardKaril 
                                        data={karil}/>
                                    </Box>
                                    )}
                                </Box>
                            }
                            
                        </Box>

                        {/* UPDATE ROLE MODAL */}
                        <Modal className="modal" show={isOpen} onHide={hideModal}>
                            <ModalHeader className="modalHeader">
                                <h5 className="modal-title" id="exampleModalLongTitle">Update Role</h5>
                                <h4 type="button" className="close" onClick={hideModal}>
                                    <span aria-hidden="true">&times;</span>
                                </h4>
                            </ModalHeader>
                            <ModalBody className="modalBody">
                                <Form.Group className="">
                                    <Form.Label className="text-large">Nama</Form.Label>
                                    <Form.Control type="text" name="selected_name" value={user.profile.full_name}
                                    disabled/>
                                </Form.Group>
                                <Form.Group className="">
                                    <Form.Label className="text-large">Role</Form.Label>
                                        <Form.Select name="selected_role" aria-label="role"
                                            value={selectedRole} onChange={handleChangeField} >
                                                <option value='mahasiswa'>Mahasiswa</option>
                                                <option value='dosen'>Dosen</option>
                                                <option value='sivitas UI'>Sivitas UI</option>
                                                <option value='staf'>Staf Dept. Kesejahteraan Sosial UI</option>
                                    </Form.Select>
                                </Form.Group>
                            </ModalBody>
                            <ModalFooter className="modalFooter">
                                <button type="button" className="btn btn-primary cancel" onClick={hideModal}
                                        id="cancel">Batal</button>
                                <button type="button" className="btn btn-primary accept" id="accept"
                                onClick={submitData}>Ya</button>
                            </ModalFooter>
                        </Modal>

                         {/* SUCCESS MODAL */}
                        <SuccessModalWithHide show={successModal}
                                hide={hideSuccessModal}
                                title="Role berhasil diubah!"
                                content={message}
                                buttonText="Lihat daftar user"
                                >
                        </SuccessModalWithHide>

                    </Box>
    
                    : ''
                }
            </Box>
        </Box>
    </Dasbor>
  );               
}

export default ProfilePage;
