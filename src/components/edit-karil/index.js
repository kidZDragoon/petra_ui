import React, {Component} from "react";
import {Link} from "react-router-dom";
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
import CloseIcon from '@mui/icons-material/Close';
import InputGroup from 'react-bootstrap/InputGroup'
import AuthenticationDataService from "../../services/authentication.service";
import ConfirmationPopUp from '../modals/confirmation-pop-up';
import SuccessModalWithButton from "../modals/success-modal-with-button";
import Dasbor from "../dasbor";    

export default class EditKaryaIlmiah extends Component {
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
            //dropdown data
            semesters: [],

            id:"",
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
            errors: {}
        };  
    }

    // Untuk nampilin data pilihan dropdown saat pertama kali halaman dibuka
    componentDidMount() {
        this.loadUser();
        const pathname = window.location.href.split("/edit-karil/")[1];
        this.loadDataKaril(pathname);
        this.loadSemesterData();
        this.loadUser();
    }

    async loadDataKaril(item, event){
        try{
            const { data }= await axios.get("/api/karyaIlmiah/" + item + "/");
            this.setState({
                author: data.author, 
                npm: data.npm, 
                judul: data.judul, 
                tglDisetujui: data.tglDisetujui, 
                semesterDisetujui: data.semesterDisetujui.id, 
                jenis: data.jenis, 
                abstrak: data.abstrak, 
                kataKunci: data.kataKunci, 
                filePDF: data.filePDF,
                filePDFcompare: data.filePDF,
                userPengunggah: data.userPengunggah.id,
                id:item,
            })
            // this.fileInput.current.value = data.filePDF
            console.log("semester: " + data.semesterDisetujui);
            console.log("file: ", this.state.judul, ".pdf")
        }catch(error) {
            alert("Oops terjadi masalah pada server");
            console.log(" gakdapet")
            console.log("/api/karyaIlmiah/" + item + "/")
        }
    }

    //Untuk me-retrieve data semester dari backend buat ditampilin di dropdown
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
            console.log("user pengunggah");
            console.log(response.data.id);

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
        }

        //NPM
        if (this.state.npm == "") {
            isValid = false;
            errors["npm"] = "Mohon lengkapi npm penulis";
        }

        //Judul
        if (this.state.judul == "") {
            isValid = false;
            errors["judul"] = "Mohon lengkapi judul karya ilmiah";
        }

        //Tanggal disetujui
        if (this.state.tglDisetujui == null) {
            isValid = false;
            errors["tglDisetujui"] = "Mohon lengkapi tanggal disetujuinya karya ilmiah";
        }

        //Semester disetujui
        if (this.state.semesterDisetujui == "") {
            isValid = false;
            errors["semesterDisetujui"] = "Mohon lengkapi semester disetujuinya karya ilmiah";
        }

        //Jenis
        if (this.state.jenis == "") {
            isValid = false;
            errors["jenis"] = "Mohon lengkapi jenis karya ilmiah";
        }

        //Abstrak
         if (this.state.abstrak == "") {
            isValid = false;
            errors["abstrak"] = "Mohon lengkapi abstrak karya ilmiah";
        }

        //Abstrak
        if (this.state.kataKunci == "") {
            isValid = false;
            errors["kataKunci"] = "Mohon lengkapi kata kunci karya ilmiah";
        }

        //Abstrak
        if (this.state.filePDF == null) {
            isValid = false;
            errors["filePDF"] = "Mohon cantumkan file PDF karya ilmiah";
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
        // this.setState({ filePDF: event.target.files[0]})
        console.log("masuk handle file field")
        let errors = {};
        console.log(event.target.files[0].type)

        if (event.target.files[0].type === 'application/pdf') {
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

    // Untuk mengganti file
    handleDropFile= () => {
        console.log("sebelum: ", this.state.filePDF)
        this.setState({filePDF: null})
        console.log("sesudah: ", this.state.filePDF)
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

            if (this.state.filePDFcompare == this.state.filePDF){
                const res = await axios.put(
                    "/api/edit-karil/" + this.state.id ,
                    formData,
                    { headers: {
                        'content-type': 'multipart/form-data'
                    }
                    }
                )
            } else{
                const res = await axios.put(
                    "/api/edit-karil-upload/" + this.state.id ,
                    formData,
                    { headers: {
                        'content-type': 'multipart/form-data'
                    }
                    }
                )
            }                   

            this.showSuccessModal();

        } catch (error) {
            alert("Terjadi error di server. Mohon tunggu beberapa saat.");
        }
    }

    async loadUser(){
        try {
            let token = localStorage.getItem("ssoui");
            console.log(token);
            token = JSON.parse(token);
            console.log(token);
            if (token !== null){
                const response = await AuthenticationDataService.profile(token);
                console.log(response);
                console.log(response.data.role);
                this.setState({role:response.data.role});
            }

        } catch {
            console.log("Load user error!");
        }
    }

    render() {
        return(
            <div>
                {this.state.role === "staf"?
                    <Container className="main-container list row">
                        <p className="text-section-header px-0">
                            <span class="pull-right">
                                <Link to={`/KaryaIlmiah/${this.state.id}`} className="pl-0 mx-4 text-orange">
                                    <ChevronLeftIcon fontSize="large"></ChevronLeftIcon>
                                    </Link>
                            </span>
                            Ubah Data Karya Ilmiah
                        </p>
                    
                        <ConfirmationPopUp action={this.submitData}
                            show={this.state.confirmationPopUp}
                            hide={this.hideConfirmation}
                            title="Apakah Anda yakin ingin mengubah karya ilmiah ini?"
                            content="Pastikan semua data yang dimasukkan sudah benar.">
                        </ConfirmationPopUp>

                        <SuccessModalWithButton show={this.state.successModal}
                            link={`/KaryaIlmiah/${this.state.id}`}
                            title="Karya ilmiah berhasil diubah!"
                            content=""
                            buttonText="Lihat karya ilmiah">
                        </SuccessModalWithButton>

                        <Form>
                            <Stack gap={4}>
                                <Form.Group className="">
                                    <Form.Label className="text-large">Nama lengkap penulis</Form.Label>
                                    <Form.Control type="text" name="author" placeholder="Nama lengkap"
                                    value={this.state.author} onChange={this.handleChangeField}/>
                                    <span className="text-error text-small">
                                        {this.state.errors["author"]}
                                    </span>
                                </Form.Group>

                                <Form.Group className="">
                                    <Form.Label className="text-large">NPM penulis</Form.Label>
                                    <Form.Control type="number" name="npm" placeholder="NPM"
                                    value={this.state.npm} onChange={this.handleChangeField}/>
                                    <span className="text-error text-small">
                                    {this.state.errors["npm"]}
                                    </span>
                                </Form.Group>

                                <Form.Group className="">
                                    <Form.Label className="text-large">Judul karya ilmiah</Form.Label>
                                    <Form.Control type="text" name="judul" placeholder="Judul karya ilmiah" 
                                    value={this.state.judul} onChange={this.handleChangeField}/>
                                    <span className="text-error text-small">
                                        {this.state.errors["judul"]}
                                    </span>
                                </Form.Group>

                                <Form.Group className="">
                                    <Form.Label className="text-large">Tanggal yudisium</Form.Label>
                                    <Form.Control type="date" name="tglDisetujui" placeholder="Tanggal yudisium"
                                    value={this.state.tglDisetujui} onChange={this.handleChangeField}/>
                                    <span className="text-error text-small">
                                        {this.state.errors["tglDisetujui"]}
                                    </span>
                                </Form.Group>

                                <Form.Group className="">
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

                                <Form.Group className="">
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

                                <Form.Group className="">
                                    <Form.Label className="text-large">Abstrak</Form.Label>
                                    <Form.Control name="abstrak" as="textarea" rows={8} 
                                    value={this.state.abstrak} onChange={this.handleChangeField}/>
                                    <span className="text-error text-small">
                                        {this.state.errors["abstrak"]}
                                    </span>
                                </Form.Group>

                                <Form.Group className="">
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
                                
                                <div>
                                    <Form.Label className="text-large">Unggah karya ilmiah</Form.Label>
                                    {this.state.filePDF == null 
                                    ? <Form.Group className="">
                                        <Form.Control name="filePDF" type="file" onChange={this.handleFileField}/>
                                        <span className="text-error text-small">
                                            {this.state.errors["filePDF"]}
                                        </span>
                                    </Form.Group>
                                    : <InputGroup className="mb-3">
                                        <Form.Control type="text" name="filePDF" 
                                            placeholder={this.state.judul + ".pdf"} 
                                            disabled/>
                                        <Button variant="outline-secondary" id="button-addon2">
                                            <p style={{textAlign:"center", marginTop:'0.5rem', marginBottom: '0.5rem'}}>Preview</p>
                                        </Button>
                                        <Button variant="outline-secondary" id="button-addon2" onClick={this.handleDropFile}>
                                            <CloseIcon fontsize="small"></CloseIcon>
                                        </Button>
                                    </InputGroup>
                                    }
                                </div>
                                
                                <Button className="primary-btn mt-5" onClick={this.handleValidation}>
                                    <p className="text-bold-large text-institutional-white m-0 p-0">Unggah</p>
                                </Button>
                            </Stack>
                        </Form>
                        
                    </Container>
                : null
                }
            </div>
        );
    }
}