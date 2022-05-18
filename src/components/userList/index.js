import React, {Component} from "react";
import {Link} from "react-router-dom";
import classes from "./styles.module.css";
import axios from "axios";
import { Form } from "react-bootstrap";
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'react-bootstrap'
import SuccessModalWithButton from "../modals/success-modal-with-button";
import Dasbor from "../dasbor";
import {Container, Typography, Box} from "@mui/material"

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
           user:[],
           profile:[],
           merge:[],
           roles:["Mahasiswa Dept. Kesejahteraan Sosial FISIP UI", "Sivitas UI", "Staf Dept. Kesejahteraan Sosial FISIP UI", "Dosen"],
           selected_role:"",
           selected_name:"",
           selected_id:"",
           selected_org_code:"",
           selected_npm:"",
           selected_faculty:"",
           selected_study_program:"",
           selected_educational_program:"",
           selected_user:"",
           redirect:false,
           successModal: false,
           message:""

        };
        this.handleChangeField = this.handleChangeField.bind(this);
        this.submitData = this.submitData.bind(this);
        this.hideSuccessModal = this.hideSuccessModal.bind(this);
        this.loadUserData = this.loadUserData.bind(this);
        this.loadProfileData = this.loadProfileData.bind(this);
        // this.showModal = this.showModal.bind(this);
       
    }

    
    componentDidMount() {
        // this.loadUser();
        this.loadUserData()
        console.log("sini")
        console.log(this.state.merge)
        console.log(this.state.roles)
    }

    async loadUserData(){
        try {
            const { data } = await axios.get("/api/user");
            this.setState({ user: data.data });
            console.log(this.state.user)
            this.loadProfileData()

        } catch (error) {
            alert("Oops terjadi masalah pada server");
        }
    }

    async loadProfileData(){
        try {
            const { data } = await axios.get("/api/profile");
            this.setState({ profile: data.data });
            console.log(this.state.profile)
            console.log("kk")
            const uniqueID = [...new Set(this.state.user.map(item => item.id))]
            console.log(uniqueID)
            uniqueID.forEach((item) => {
                var user = this.state.user.filter(function(obj) {
                    return obj.id === item;
                });
                var profile = this.state.profile.filter(function(obj) {
                    return obj.id === item;
                });
                console.log(user[0])
                console.log(profile[0])
                var user_profile = Object.assign({}, user[0], profile[0]);
                console.log("ooo")
                console.log(user_profile)
                this.state.merge.push(user_profile) 
                console.log(this.state.merge)
                // var pushed = this.state.merge.push(user_profile)
                // console.log(JSON.stringify(pushed))
                // this.setState({merge: JSON.stringify(pushed)})
                // console.log(this.state.merge)
            })
            var merge_user = this.state.merge
            this.setState({merge:merge_user})

        } catch (error) {
            alert("Oops terjadi masalah pada server");
        }
    }

    handleChangeField(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    showModal(usr){
        console.log(usr.full_name)
        console.log(usr.role)
        // const { name, value } = event.target;
        this.setState({selected_name:usr.full_name.toString(), isOpen:true, selected_role:usr.role,
            selected_id:usr.id, selected_user:usr.user, selected_org_code:usr.org_code, selected_npm:usr.npm,
            selected_faculty:usr.faculty, selected_study_program:usr.study_program, selected_educational_program:usr.educational_program});
        console.log(this.state.selected_name)
        console.log(this.state.selected_role)
        console.log(this.state.selected_study_program)
        console.log(this.state.selected_org_code)
        console.log(this.state.selected_user)
    };

    hideModal = () => {
        this.setState({isOpen:false})
    };

    showSuccessModal = () => {
        this.setState({successModal:true, message:"Role dari akun dengan nama " + this.state.selected_name + " berhasil diubah menjadi " + this.state.selected_role})
    };

    hideSuccessModal = () => {
        this.setState({
            successModal:false,
            redirect:true,
            isOpen:false,
            user:[],
            profile:[],
            merge:[],
        })
        this.componentDidMount()
        
    };

    async submitData(event) {
        event.preventDefault();
        // try {
            console.log("name:"+this.state.selected_name)
            console.log("role:"+this.state.selected_role)
            console.log("id:"+this.state.selected_id)
            let formData = new FormData();
            formData.append('id', this.state.selected_id);
            formData.append('user', this.state.selected_user);
            formData.append('org_code', this.state.selected_org_code);
            formData.append('role', this.state.selected_role);
            formData.append('npm', this.state.selected_npm);
            formData.append('faculty', this.state.selected_faculty);
            formData.append('study_program', this.state.selected_study_program);
            formData.append('educational_program', this.state.selected_educational_program);
            console.log(formData)

            const res = await axios.put(
                    "/api/profile/" + this.state.selected_id +"/",
                    formData,
                    { headers: {
                        'content-type': 'multipart/form-data'
                    }
                    }
                )

            console.log("update success")

            this.hideModal()
            console.log("hide success")
            this.showSuccessModal()
            console.log("sucess success")
        
                
        // }
            
           

        // catch (error) {
        //     alert("Terjadi error di server. Mohon tunggu beberapa saat.");
        // }
    }


    render (){
        return (
            <Dasbor>
                <Container py={4} px={8} id={classes["container"]}>
                    <Typography fontFamily="Mulish" fontWeight={900} fontSize={28} id={classes["title"]}>
                        Kelola User
                    </Typography>
                    <table className="table table-borderless" >
                        <thead>
                        <tr className="d-flex" id={classes["tabelHeader"]}>
                            <th className="col-1">No</th>
                            <th className="col-3">Nama Lengkap</th>
                            <th className="col-3">Email</th>
                            <th className="col-3">Role</th>
                            <th className="col-1"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.merge.map((usr, index) => (
                            <tr className="d-flex">
                            <td className="col-1">{index += 1}</td>
                            <td className="col-3"><Link to={`/kelola-user/${usr.id}`} className="link">{usr.full_name}</Link></td> 
                            <td className="col-3">{usr.email}</td>
                            <td className="col-3">{usr.role}</td>
                        
                            <td className="col-1">
                                <button  name="selected_name" value={usr.full_name}
                                id={classes["features"]} onClick={() => this.showModal(usr)}>Update Role</button>
                            </td>
                        
                        </tr>
                        ))} 

                        </tbody>

                    </table>
                    <Modal className={classes.modal} show={this.state.isOpen} onHide={this.hideModal}>
                        <ModalHeader className={classes.modalHeader} >
                            <h5 className={classes.modalTitle} id="exampleModalLongTitle">Update Role</h5>
                            <h4 type="button" className={classes.close}  onClick={this.hideModal}>
                                <span aria-hidden="true">&times;</span>
                            </h4>
                        </ModalHeader>
                        <ModalBody className={classes.modalBody}>
                            <Form.Group className="">
                                <Form.Label className="text-large">Nama</Form.Label>
                                <Form.Control type="text" name="selected_name" value={this.state.selected_name}
                                disabled/>
                            </Form.Group>
                            <Form.Group className="">
                                <Form.Label className="text-large">Role</Form.Label>
                                    <Form.Select name="selected_role" aria-label="role"
                                        value={this.state.selected_role} onChange={this.handleChangeField} >
                                        {this.state.roles.map((role) => (
                                            <option value={role}>{role}</option>
                                        ))} 
                                </Form.Select>
                            </Form.Group>
                            <p className={classes.warning}>Dengan merubah role, pengguna akan memiliki akses yang berbeda di sistem</p>
                        </ModalBody>
                        <ModalFooter className={classes.modalFooter}>
                            <button type="button" className="btn btn-primary" onClick={this.hideModal}
                                     id={classes["cancle"]}>Batal</button>
                            <button type="button" className="btn btn-primary"  id={classes["submit"]}
                            onClick={this.submitData}>Ya</button>
                        </ModalFooter>

                    </Modal>

                    <SuccessModalWithButton show={this.state.successModal}
                            title="Role berhasil diubah!"
                            content={this.state.message}
                            buttonText="Lihat daftar user"
                            link="/list-user" 
                            notLink={true}
                            action={this.hideSuccessModal}
                            >
                    </SuccessModalWithButton>
                
                </Container>
            </Dasbor>
        )
    }
}