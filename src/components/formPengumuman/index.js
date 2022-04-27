import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { ButtonGroup } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack'
import classes from "./styles.module.css";
import axios from "axios";
import AuthenticationDataService from "../../services/authentication.service";
import { Link, Navigate } from "react-router-dom"
import ConfirmationPopUp from '../modals/confirmation-pop-up';
import SuccessModalWithButton from "../modals/success-modal-with-button";



export default class FormPengumuman extends Component {
    constructor(props) {
        super(props);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.submitData = this.submitData.bind(this);
        this.hideConfirmation = this.hideConfirmation.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
       
        this.state = {
            judul: this.props.judul,
            pesan:"",
            userPengunggah:"",
            tglDibuat:Date,
            id:"",
            redirect:false,
            successModal:false,
            confirmationPopUp:false,
            message:"",
            role:"",
            formIsValid: false,
            errors: {}
        };
      
    }

    
    componentDidMount() {
        this.loadUser();
    
    }
    
    componentWillReceiveProps(props){
        console.log("masuk receive props")
        this.setState({judul: props.judul, pesan: props.pesan, tglDibuat: props.tglDibuat,
            id: props.id})
    }

    handleChangeField(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    
    async submitData(event) {
        event.preventDefault();
        
        try {
            console.log(this.props)
            console.log("id:"+this.state.id)
            var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let formData = new FormData();
            formData.append('judul', this.state.judul);
            formData.append('isiPengumuman', this.state.pesan);
            if (this.state.id === "") {
                formData.append('tglDibuat', date);
                formData.append('tglDisunting', date);
                formData.append('stafPembuat', this.state.userPengunggah);

                console.log(formData)

                const res = await axios.post(
                        "/api/pengumuman/",
                        formData,
                        { headers: {
                            'content-type': 'multipart/form-data'
                        }
                        }
                    )

                console.log("post success")
                this.hideConfirmation()
                this.showSuccessModal();
               
                console.log("upload success")
            
            }else {
                formData.append('tglDibuat', this.props.tglDibuat);
                formData.append('tglDisunting', date);
                formData.append('stafPembuat', this.state.userPengunggah);
                console.log(formData)
                console.log(this.state.confirmationPopUp)
                
                const res = await axios.put(
                        "/api/pengumuman/" + this.props.id,
                        formData,
                        { headers: {
                            'content-type': 'multipart/form-data'
                        }
                        }
                    )

                console.log("update success")

                //Reset state jadi kosong lagi
                // this.setState({
                //     judul: "",
                //     pesan: "",
                //     redirect:true,
                // })
                this.hideConfirmation()
                this.showSuccessModal();
                console.log("upload success")
                
                
            }
           

        } catch (error) {
            alert("Terjadi error di server. Mohon tunggu beberapa saat.");
        }
    }

    async loadUser(){
        try {
            console.log("masuk load user");
            let token = localStorage.getItem("ssoui");
            console.log(token);
            token = JSON.parse(token);
            console.log(token);
            const response = await AuthenticationDataService.profile(token);
            console.log(response);
            this.setState({userPengunggah: response.data.id, role:response.data.role});
            console.log("user pengunggah");
            console.log(this.state.role);
            console.log(response.data);
        

        } catch {
            console.log("Load user error!");
        }
    }

    showSuccessModal = () => {
        this.setState({successModal:true, message:"Pengumuman dengan judul '"+this.state.judul+"' kini dapat dilihat oleh pengguna lain" })
    };

    showConfirmation(event){
        event.preventDefault()
        console.log("masuk show confirmation")
        this.setState({confirmationPopUp:true})
    
    };

    hideConfirmation(){
        this.setState({confirmationPopUp:false})
    };

    handleValidation(){

        let isValid = true;
        let errors = {}

        console.log("masuk handle validation")

        //Author
        if (this.state.judul === "") {
            console.log(this.state.judul)
            isValid = false;
            errors["judul"] = "Mohon lengkapi judul dari pengumuman";
        }

        //NPM
        if (this.state.pesan === "") {
            console.log(this.state.pesan)
            isValid = false;
            errors["pesan"] = "Mohon lengkapi pesan pengumuman";
        }
        console.log(errors)
        this.setState({ formIsValid: isValid, errors: errors  });

        if(isValid === true){
            this.submitData()
        }

    }

    render (){
        return (
            <div className="container">
                {this.state.role === "staf"?
                <div>
                    <h2>Form Pengumuman</h2>
                <ConfirmationPopUp action={this.submitData}
                        show={this.state.confirmationPopUp}
                        hide={this.hideConfirmation}
                        title="Apakah Anda yakin ingin mempublikasi pengumuman ini?"
                        content="Pastikan semua data yang dimasukkan sudah benar.">
                </ConfirmationPopUp>
                <SuccessModalWithButton show={this.state.successModal}
                                        title="Pengumuman berhasil dipublikasi"
                                        content={this.state.message}
                                        buttonText="Lihat daftar pengumuman"
                                        link="/list-pengumuman" >
                </SuccessModalWithButton>
                 <Form>
                    <Stack gap={4}>
                        <Form.Group className="">
                            <Form.Label className="text-large">Judul</Form.Label>
                            <Form.Control type="text" name="judul" placeholder="Judul Pengumuman"
                            value={this.state.judul} onChange={this.handleChangeField} />
                            <span className="text-error text-small">
                                {this.state.errors["judul"]}
                            </span>
                        </Form.Group>

                        
                        <Form.Group className="">
                            <Form.Label className="text-large">Pesan</Form.Label>
                            <Form.Control name="pesan" as="textarea" rows={8} placeholder="Pesan Pengumuman"
                             value={this.state.pesan} onChange={this.handleChangeField} />
                             <span className="text-error text-small">
                                {this.state.errors["pesan"]}
                            </span>
                        </Form.Group>
                        <ButtonGroup >
                            <button className={classes.button} id={classes["solid"]} onClick={this.submitData}>
                                <p className="text-bold-large text-institutional-white m-0 p-0">Simpan</p>
                            </button>
                            <Link to="/list-pengumuman" className="button">
                                <button  className={classes.button} id={classes["outline"]}>
                                    <p className="text-bold-large text-institutional m-0 p-0">Batal</p>
                                </button>
                            </Link>
                        </ButtonGroup>
                        
                        
                        
                    </Stack>
                </Form>
                </div>:<div></div>
                }
                
            
            </div>
        )
    }
}

