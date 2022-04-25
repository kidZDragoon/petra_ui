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

export default class UploadKaryaIlmiah extends Component {
    constructor(props) {
        super(props);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.submitData = this.submitData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.loadVerificatorData = this.loadVerificatorData.bind(this);
        this.loadSemesterData = this.loadSemesterData.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.handleFileField = this.handleFileField.bind(this);
        this.showSuccessModal = this.showSuccessModal.bind(this);
        this.showConfirmation = this.showConfirmation.bind(this);
        this.hideConfirmation = this.hideConfirmation.bind(this);
        this.handleValidation = this.handleValidation.bind(this);

        this.state = {
            //dropdown data
            verificators: [],
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
            dosenPembimbing: "",
            filePDF: null,
            check: null,
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

    componentDidMount() {
        this.loadVerificatorData();
        this.loadSemesterData();
        this.loadUser();
    }

     async loadVerificatorData(){
        try {
            console.log("load verificator data")
            const { data } = await axios.get("/api/get-verificator-data/");
            this.setState({ verificators: data.data }); 
            console.log(this.state.verificators);
        } catch (error) {
            alert("Oops terjadi masalah pada server");
        }
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

        //Dosen Pembimbing
        if (this.state.dosenPembimbing == "") {
            isValid = false;
            errors["dosenPembimbing"] = "Mohon lengkapi dosen pembimbing karya ilmiah";
            document.getElementById("input-dosenPembimbing").scrollIntoView();
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
        else if (this.state.dosenPembimbing == "") {
            document.getElementById("input-dosenPembimbing").scrollIntoView();
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
            formData.append('dosenPembimbing', this.state.dosenPembimbing);
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
                dosenPembimbing: "",
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
        return(
            <Container className="main-container list row">
                <p className="text-section-header px-0">
                    <span class="pull-right">
                        <Link to="/" className="pl-0 mx-4 text-orange">
                            <ChevronLeftIcon fontSize="large"></ChevronLeftIcon>
                            </Link>
                    </span>
                    Unggah Karya Ilmiah
                </p>

                <ConfirmationPopUp action={this.submitData}
                        show={this.state.confirmationPopUp}
                        hide={this.hideConfirmation}
                        title="Apakah Anda yakin ingin mengunggah karya ilmiah new baru nih?"
                        content="Pastikan semua data yang dimasukkan sudah benar.">
                </ConfirmationPopUp>

                <SuccessModalWithButton show={this.state.successModal}
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
                                <option value="Skripsi">Skripsi</option>
                                <option value="Tesis">Tesis</option>
                                <option value="Disertasi">Disertasi</option>
                                <option value="Nonskripsi">Nonskripsi</option>
                            </Form.Select>
                            <span className="text-error text-small">
                                {this.state.errors["jenis"]}
                            </span>
                        </Form.Group>

                        <Form.Group className="" id="input-dosenPembimbing">
                            <Form.Label className="text-large">Nama dosen pembimbing</Form.Label>

                            {/* Isi setiap value dropdown dengan data verifikator yang sudah diretrieve. 
                            Caranya diloop pake function map */}
                            <Form.Select name="dosenPembimbing" aria-label="Nama dosen pembimbing"
                             value={this.state.dosenPembimbing} onChange={this.handleChangeField} >
                                <option>Pilih dosen pembimbing</option>
                                 {this.state.verificators.map(verificator => (
                                     <option key={verificator.id} value={verificator.id}>
                                         {verificator.full_name}
                                        </option>
                                 ))}
                            </Form.Select>
                            <span className="text-error text-small">
                                {this.state.errors["dosenPembimbing"]}
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
            
        );
    }
}