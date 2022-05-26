import React, {Component} from "react";
import {Link, useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../index.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import http from "../../http-common";
import axios from "axios";
import AuthenticationDataService from "../../services/authentication.service";
import ConfirmationPopUp from '../modals/confirmation-pop-up';
import SuccessModalWithButton from "../modals/success-modal-with-button";
import MissingPage from "../missing-page";
import BarLoader from "react-spinners/BarLoader";
import { Box } from "@mui/material";

export default class UploadKaryaIlmiah extends Component {
    constructor(props) {
        super(props);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.submitData = this.submitData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.loadSemesterData = this.loadSemesterData.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.handleFileField = this.handleFileField.bind(this);
        this.showSuccessModal = this.showSuccessModal.bind(this);
        this.showConfirmation = this.showConfirmation.bind(this);
        this.hideConfirmation = this.hideConfirmation.bind(this);
        this.handleValidation = this.handleValidation.bind(this);

        this.state = {
            authorized: false,
        
            //dropdown data
            semesters: [],

            //form data
            author: "",
            npm: "",
            judul: "",
            tglDisetujui: null,
            semesterDisetujui: "",
            jenis: "",
            abstrak: "",
            kataKunci: "",
            filePDF: null,
            userPengunggah: "",

            //result
            result: [],
            profile: null,

            //model & pop ups
            successModal: false,
            confirmationPopUp: false,

            //form validation
            formIsValid: false,
            errors: {},

            //loading
            isLoading: true,
        };
    }

    componentDidMount() {
        this.loadSemesterData();
        this.loadUser();
    }

    async loadSemesterData(){
        try {
            const { data } = await axios.get("/api/get-semester-data/");
            this.setState({ semesters: data.data });

        } catch (error) {
            alert("Oops terjadi masalah pada server");
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
            this.setState({userPengunggah: response.data.id});
            console.log("user pengunggah");
            console.log(response.data.id);
            if(response.data.role == 'mahasiswa' || response.data.role == 'staf'){
                this.setState({authorized: true});
            }
            this.setState({isLoading: false});

        } catch {
            console.log("Load user error!");
        }
    }

    showSuccessModal = () => {
        this.setState({successModal:true})
    };

    showConfirmation(){
        console.log("masuk show confirmation")

        if(this.state.formIsValid){
            this.setState({confirmationPopUp:true})
        }

    };

    hideConfirmation(){
        this.setState({confirmationPopUp:false})
    };

    handleValidation(){

        let isValid = true;
        let errors = {}

        console.log("masuk handle validation")

        //Author
        if (this.state.author == "") {
            isValid = false;
            errors["author"] = "Mohon lengkapi nama lengkap penulis";
            document.getElementById("input-author").scrollIntoView();
        }

        //NPM
        if (this.state.npm == "") {
            isValid = false;
            errors["npm"] = "Mohon lengkapi npm penulis";
            document.getElementById("input-npm").scrollIntoView();
        }

        //Judul
        if (this.state.judul == "") {
            isValid = false;
            errors["judul"] = "Mohon lengkapi judul karya ilmiah";
            document.getElementById("input-judul").scrollIntoView();
        }

        //Tanggal disetujui
        if (this.state.tglDisetujui == null) {
            isValid = false;
            errors["tglDisetujui"] = "Mohon lengkapi tanggal disetujuinya karya ilmiah";
            document.getElementById("input-tglDisetujui").scrollIntoView();
        }

        //Semester disetujui
        if (this.state.semesterDisetujui == "") {
            isValid = false;
            errors["semesterDisetujui"] = "Mohon lengkapi semester disetujuinya karya ilmiah";
            document.getElementById("input-semesterDisetujui").scrollIntoView();
        }

        //Jenis
        if (this.state.jenis == "") {
            isValid = false;
            errors["jenis"] = "Mohon lengkapi jenis karya ilmiah";
            document.getElementById("input-jenis").scrollIntoView();
        }

        //Abstrak
         if (this.state.abstrak == "") {
            isValid = false;
            errors["abstrak"] = "Mohon lengkapi abstrak karya ilmiah";
            document.getElementById("input-abstrak").scrollIntoView();
        }

        //Abstrak
        if (this.state.kataKunci == "") {
            isValid = false;
            errors["kataKunci"] = "Mohon lengkapi kata kunci karya ilmiah";
            document.getElementById("input-kataKunci").scrollIntoView();
        }

        //File PDF
        if (this.state.filePDF == null) {
            isValid = false;
            errors["filePDF"] = "Mohon cantumkan file PDF karya ilmiah";
            document.getElementById("input-filePDF").scrollIntoView();
        }

        //Scroll to error
        if (this.state.author == "") {
            document.getElementById("input-author").scrollIntoView();
        }
        else if (this.state.npm == "") {
            document.getElementById("input-npm").scrollIntoView();
        }
        else if (this.state.judul == "") {
            document.getElementById("input-judul").scrollIntoView();
        }
        else if (this.state.tglDisetujui == null) {
            document.getElementById("input-tglDisetujui").scrollIntoView();
        }
        else if (this.state.semesterDisetujui == "") {
            document.getElementById("input-semesterDisetujui").scrollIntoView();
        }
        else if (this.state.jenis == "") {
            document.getElementById("input-jenis").scrollIntoView();
        }
        else if (this.state.abstrak == "") {
            document.getElementById("input-abstrak").scrollIntoView();
        }
        else if (this.state.kataKunci == "") {
            document.getElementById("input-kataKunci").scrollIntoView();
        }
        else if (this.state.filePDF == null) {
            document.getElementById("input-filePDF").scrollIntoView();
        }

        this.setState({ formIsValid: isValid });
        this.setState({ errors: errors });

        if(isValid == true){
            this.setState({confirmationPopUp:true});
        }

    }

    //Untuk merekam isi dari setiap kotak form sebagai state
    handleChangeField(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFileField(event){
        // const { name, value } = event.target;
        // console.log({name, value})
        console.log("masuk handle file field")
        let errors = {};
        console.log(event.target.files[0])

        if (event.target.files[0] == undefined) {
            errors['filePDF'] = "Mohon cantumkan file PDF karya ilmiah";
            this.setState({ errors: errors });
        }
        else if (event.target.files[0].type === 'application/pdf') {
            console.log("file looks good")
            this.setState({ filePDF: event.target.files[0]});
            errors['filePDF'] = "";
            this.setState({ errors: errors });
        } else {
            console.log("masuk error file");
            errors['filePDF'] = "Pastikan file dalam format PDF ya!";
            this.setState({ errors: errors });
        }
    }

    //Handle submit data form ke backend
    async submitData(event) {
        event.preventDefault();

        try {
            this.setState({confirmationPopUp:false});

            let formData = new FormData();
            formData.append('author', this.state.author);
            formData.append('npm', this.state.npm);
            formData.append('judul', this.state.judul);
            formData.append('tglDisetujui', this.state.tglDisetujui);
            formData.append('semesterDisetujui', this.state.semesterDisetujui);
            formData.append('jenis', this.state.jenis);
            formData.append('abstrak', this.state.abstrak);
            formData.append('kataKunci', this.state.kataKunci);
            formData.append('filePDF', this.state.filePDF);
            formData.append('userPengunggah', this.state.userPengunggah);
            console.log(formData)

            const res = await axios.post(
                    "/api/unggah-karya-ilmiah/",
                    formData,
                    { headers: {
                        'content-type': 'multipart/form-data'
                      }
                    }
                )

            console.log("post success")

            //Reset state jadi kosong lagi
            this.setState({
                author: "",
                npm: "",
                judul: "",
                tglDisetujui: null,
                semesterDisetujui: "",
                jenis: "",
                abstrak: "",
                kataKunci: "",
                userPengunggah: "",
                filePDF: null
            })

            this.showSuccessModal();
            console.log("upload success")
           

        } catch (error) {
            alert("Terjadi error di server. Mohon tunggu beberapa saat.");
        }
    }

    render() {
        if(this.state.isLoading){
            return(
                <Container className="main-container list row" 
                    sx={{
                        height: '80vh',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}
                        >
                        <BarLoader color="#d26903" loading={this.state.isLoading} css="" size={100} />               
                    </Box>
                </Container> 
            )
        }
        else {
            if(this.state.authorized){
                return(
                    <Container className="main-container list row">

                        <Stack direction="horizontal" gap={3} className="mb-4">
                            <a href="#/karya-ilmiah-saya">
                                <span className="pull-right text-black">
                                    <ChevronLeftIcon fontSize="large"></ChevronLeftIcon>
                                </span>
                            </a>
                            
                        
                            <h3 className="text-section-header px-0 my-0"> Unggah Karya Ilmiah</h3>
                        </Stack>
    
                        <ConfirmationPopUp action={this.submitData}
                                show={this.state.confirmationPopUp}
                                hide={this.hideConfirmation}
                                title="Apakah Anda yakin ingin mengunggah karya ilmiah new baru nih?"
                                content="Pastikan semua data yang dimasukkan sudah benar.">
                        </ConfirmationPopUp>
    
                        <SuccessModalWithButton show={this.state.successModal}
                                                link='/karya-ilmiah-saya'
                                                title="Karya ilmiah berhasil diunggah!"
                                                content="Mohon tunggu agar karya ilmiah diverifikasi oleh dosen pembimbing Anda terlebih dahulu 
                                                agar bisa ditampilkan untuk umum."
                                                buttonText="Lihat daftar karya ilmiah">
                        </SuccessModalWithButton>
    
                        <Form>
                            <Stack gap={4}>
                                <Form.Group className="" id="input-author">
                                    <Form.Label className="text-large">Nama lengkap penulis</Form.Label>
                                    <Form.Control type="text" name="author" placeholder="Nama lengkap"
                                    value={this.state.author} onChange={this.handleChangeField}/>
                                    <span className="text-error text-small">
                                        {this.state.errors["author"]}
                                    </span>
                                </Form.Group>
    
                                <Form.Group className="" id="input-npm">
                                    <Form.Label className="text-large">NPM penulis</Form.Label>
                                    <Form.Control type="number" name="npm" placeholder="NPM"
                                    value={this.state.npm} onChange={this.handleChangeField}/>
                                    <span className="text-error text-small">
                                    {this.state.errors["npm"]}
                                    </span>
                                </Form.Group>
    
                                <Form.Group className="" id="input-judul">
                                    <Form.Label className="text-large">Judul karya ilmiah</Form.Label>
                                    <Form.Control type="text" name="judul" placeholder="Judul karya ilmiah" 
                                    value={this.state.judul} onChange={this.handleChangeField}/>
                                    <span className="text-error text-small">
                                        {this.state.errors["judul"]}
                                    </span>
                                </Form.Group>
    
                                <Form.Group className="" id="input-tglDisetujui">
                                    <Form.Label className="text-large">Tanggal yudisium</Form.Label>
                                    <Form.Control type="date" name="tglDisetujui" placeholder="Tanggal yudisium" 
                                    value={this.state.tglDisetujui} onChange={this.handleChangeField}/>
                                    <span className="text-error text-small">
                                        {this.state.errors["tglDisetujui"]}
                                    </span>
                                </Form.Group>
    
                                <Form.Group className="" id="input-semesterDisetujui">
                                    <Form.Label className="text-large">Semester yudisium</Form.Label>
                                    <Form.Select name="semesterDisetujui" aria-label="Semester yudisium" 
                                    value={this.state.semesterDisetujui} onChange={this.handleChangeField}>
                                        <option>Pilih semester</option>
                                        {this.state.semesters.map(smt => (
                                            <option key={smt.id} value={smt.id}>
                                                {smt.semester}
                                                </option>
                                        ))}
                                    </Form.Select>
                                    <span className="text-error text-small">
                                        {this.state.errors["semesterDisetujui"]}
                                    </span>
                                </Form.Group>
    
                                <Form.Group className="" id="input-jenis">
                                    <Form.Label className="text-large">Jenis karya ilmiah</Form.Label>
                                    <Form.Select name="jenis" aria-label="Jenis karya ilmiah"
                                    value={this.state.jenis} onChange={this.handleChangeField} >
                                        <option>Pilih jenis karya ilmiah</option>
                                        <option value="Skripsi-TKA">Skripsi-TKA</option>
                                        <option value="Tesis">Tesis</option>
                                        <option value="Disertasi">Disertasi</option>
                                        <option value="Non-karya akhir">Non-karya akhir</option>
                                    </Form.Select>
                                    <span className="text-error text-small">
                                        {this.state.errors["jenis"]}
                                    </span>
                                </Form.Group>
    
                                <Form.Group className="" id="input-abstrak">
                                    <Form.Label className="text-large">Abstrak</Form.Label>
                                    <Form.Control name="abstrak" as="textarea" rows={8} 
                                    value={this.state.abstrak} onChange={this.handleChangeField}/>
                                    <span className="text-error text-small">
                                        {this.state.errors["abstrak"]}
                                    </span>
                                </Form.Group>
    
                                <Form.Group className="" id="input-kataKunci">
                                    <Form.Label className="text-large">Kata kunci</Form.Label>
                                    <p className="text-charcoal text-small">
                                        Contoh: Customer experience, sentiment analysis, e-commerce
                                    </p>
                                    <Form.Control name="kataKunci" as="textarea" rows={3} 
                                    value={this.state.kataKunci} onChange={this.handleChangeField}/>
                                    <span className="text-error text-small">
                                        {this.state.errors["kataKunci"]}
                                    </span>
                                </Form.Group>
    
                                <Form.Group className="" id="input-filePDF">
                                    <Form.Label className="text-large">Unggah karya ilmiah</Form.Label>
                                    <p className="text-charcoal text-small">
                                        Pastikan file dalam format PDF
                                    </p>
                                    <Form.Control name="filePDF" type="file" onChange={this.handleFileField}/>
                                    <span className="text-error text-small">
                                        {this.state.errors["filePDF"]}
                                    </span>
                                </Form.Group>
                                
                                <Button className="primary-btn mt-5" onClick={this.handleValidation}>
                                    <p className="text-bold-large text-institutional-white m-0 p-0">Unggah</p>
                                </Button>
                            </Stack>
                        </Form>
                        
                    </Container>
                    
                );}
            else {
                return(
                    <MissingPage></MissingPage>     
                )
            }
        } 
    }
}
