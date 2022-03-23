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
import Modal from 'react-bootstrap/Modal'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import AuthenticationDataService from "../../services/authentication.service";

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
        this.hideSuccessModal = this.hideSuccessModal.bind(this);
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

    // Untuk nampilin data pilihan dropdown saat pertama kali halaman dibuka
    componentDidMount() {
        console.log("componentDidMount()");
        this.loadVerificatorData();
        this.loadSemesterData();
        this.loadUser();
    }

     //Untuk me-retrieve data verifikator dari backend buat ditampilin di dropdown
     async loadVerificatorData(){
        try {
            console.log("masuk sini")
            const { data } = await axios.get("/api/get-verificator-data/");
            console.log("dah keget")
            this.setState({ verificators: data.data }); //Set data verifikator sebagai state supaya bisa digunakan lagi
            console.log("verificator data loaded");
            console.log(this.state.verificators);
            
        } catch (error) {
            alert("Oops terjadi masalah pada server");
            console.log(error);
        }
    }

    //Untuk me-retrieve data semester dari backend buat ditampilin di dropdown
    async loadSemesterData(){
        try {
            console.log("masuk semester get")
            const { data } = await axios.get("/api/get-semester-data/");
            console.log("dah keget smt")
            this.setState({ semesters: data.data }); //Set data verifikator sebagai state supaya bisa digunakan lagi
            console.log("semester data loaded");
            console.log(this.state.semesters);
            
        } catch (error) {
            alert("Oops terjadi masalah pada server");
            console.log(error);
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

    hideSuccessModal = () => {
        this.setState({successModal:false})
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

        //Dosen Pembimbing
        if (this.state.dosenPembimbing == "") {
            isValid = false;
            errors["dosenPembimbing"] = "Mohon lengkapi dosen pembimbing karya ilmiah";
        }

        //Abstrak
        if (this.state.filePDF == null) {
            isValid = false;
            errors["filePDF"] = "Mohon cantumkan file PDF karya ilmiah";
        }

        //Check
        if (this.state.check == false) {
            isValid = false;
            errors["check"] = "Mohon lengkapi kotak persetujuan";
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
        console.log({name, value})
        console.log(this.state.author);
        console.log(this.state.filePDF);
        console.log("hai");
    }

    handleFileField(event){
        console.log("1 " + event.target);
        console.log("2 " + event.target.files[0])
        console.log("3 " + event.target.files[0].name)
        // const { name, value } = event.target;
        // console.log({name, value})
        this.setState({ filePDF: event.target.files[0]})
        console.log("file " + this.state.filePDF);
        console.log("name " + this.state.filePDF.name);
    }

    //Handle submit data form ke backend
    async submitData(event) {
        event.preventDefault();
        try {
            this.setState({confirmationPopUp:false});

            console.log("halo")

            //Buat dictionary data untuk dikirim ke backend
            const data = {
                author: this.state.author,
                npm: this.state.npm,
                judul: this.state.judul,
                tglDisetujui: this.state.tglDisetujui,
                semesterDisetujui: this.state.semesterDisetujui,
                jenis: this.state.jenis,
                abstrak: this.state.abstrak,
                dosenPembimbing: this.state.dosenPembimbing,
                userPengunggah: this.state.userPengunggah,
                filePDF: this.state.filePDF,
                check: this.state.check,
            };

            let formData = new FormData();
            formData.append('author', this.state.author);
            formData.append('npm', this.state.npm);
            formData.append('judul', this.state.judul);
            formData.append('tglDisetujui', this.state.tglDisetujui);
            formData.append('semesterDisetujui', this.state.semesterDisetujui);
            formData.append('jenis', this.state.jenis);
            formData.append('abstrak', this.state.abstrak);
            formData.append('dosenPembimbing', this.state.dosenPembimbing);
            formData.append('filePDF', this.state.filePDF);
            formData.append('userPengunggah', this.state.userPengunggah);

            console.log(data);

            const res = await axios.post(
                    "/api/unggah-karya-ilmiah/",
                    formData,
                    { headers: {
                        'content-type': 'multipart/form-data'
                      }
                    }
                )
            console.log("terpanggil unggah")
            console.log(res.status)
            console.log(res.message)
            console.log(res.result)
            this.setState({ result: res.result});
            
            //Reset state jadi kosong lagi
            this.setState({
                author: "",
                npm: "",
                judul: "",
                tglDisetujui: null,
                semesterDisetujui: "",
                jenis: "",
                abstrak: "",
                dosenPembimbing: "",
                userPengunggah: "",
                filePDF: null,
                check: null,
            })

            this.showSuccessModal();

        } catch (error) {
            alert("Oops terjadi masalah pada server");
            console.log(error);
            console.log(error.stack);
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

                <Modal className="modal" show={this.state.confirmationPopUp} onHide={this.hideConfirmation}>
                    <Container className="px-5 pt-2 pb-4">
                        <Row>
                            <Col className="justify-content-end text-end">
                                <h4 type="button" className=""  onClick={this.hideConfirmation}>
                                    {/* <span aria-hidden="true">&times;</span> */}
                                    <span><CloseIcon fontsize="small"></CloseIcon></span>
                                </h4>
                            </Col>
                        </Row>
                        <Row className="mt-1">
                            <Col sm={12}>
                                <h5 className="modal-title text-bold-title mb-2" id="exampleModalLongTitle">
                                    Apakah Anda yakin ingin mengunggah karya ilmiah?
                                </h5>
                                <div class="modalBody mb-2 text-disabled">
                                    <p> Pastikan semua data yang dimasukkan sudah benar.</p>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col className="d-flex justify-content-start">
                                <button type="button" className="btn cancel mr-3 text-bold-large" onClick={this.hideConfirmation}>Batal</button>
                                <button type="submit" className="btn accept mr-3 text-bold-large" id="" onClick={this.submitData}>Ya</button>
                            </Col>
                        </Row>
                    </Container>
                </Modal>

                <Modal className="modal" show={this.state.successModal} onHide={this.hideSuccessModal}>
                    <Container className="px-4 pt-2 pb-4">
                        <Row>
                            <Col className="justify-content-end text-end">
                                <h4 type="button" className=""  onClick={this.hideSuccessModal}>
                                    {/* <span aria-hidden="true">&times;</span> */}
                                    <span><CloseIcon fontsize="small"></CloseIcon></span>
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={2}>
                                <div className="check-container text-white d-flex justify-content-center align-items-center">
                                    <CheckCircleIcon fontSize="large" color="white"></CheckCircleIcon>
                                </div>
                            </Col>
                            <Col sm={10}>
                                <h5 className="modal-title text-bold-large mb-2" id="exampleModalLongTitle">Karya ilmiah berhasil diunggah!</h5>
                                <div class="modalBody mb-2 text-normal">
                                    <p> Karya ilmiah yang Anda unggah akan harus diverifikasi oleh dosen 
                                        pembimbing Anda terlebih dahulu sebelum ditampilkan untuk umum.</p>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col className="">
                                <Link to="/karya-ilmiah-saya" style={{textDecoration:"none"}}>
                                    <Button className="btn btn-full-width btn-orange text-bold-large">
                                        <span>Lihat daftar karya ilmiah</span>
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </Modal>

                <Form>
                    <Stack gap={4}>
                        {/* Note: di setiap form field ada atribut value dan onChange 
                        supaya bisa ngerekam isi fieldnya sebagai state */}
                        <Form.Group className="">
                            <Form.Label className="text-large">Nama lengkap</Form.Label>
                            <Form.Control type="text" name="author" placeholder="Nama lengkap"
                            value={this.state.author} onChange={this.handleChangeField}/>
                            <span className="text-error text-small">
                                {this.state.errors["author"]}
                            </span>
                        </Form.Group>

                        <Form.Group className="">
                            <Form.Label className="text-large">NPM</Form.Label>
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
                            <Form.Label className="text-large">Tanggal disetujui</Form.Label>
                            <Form.Control type="date" name="tglDisetujui" placeholder="Tanggal disetujui" 
                             value={this.state.tglDisetujui} onChange={this.handleChangeField}/>
                            <span className="text-error text-small">
                                {this.state.errors["tglDisetujui"]}
                            </span>
                        </Form.Group>

                        <Form.Group className="">
                            <Form.Label className="text-large">Semester disetujuinya karya ilmiah</Form.Label>
                            <Form.Select name="semesterDisetujui" aria-label="Semester disetujuinya karya ilmiah" 
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
                                <option value="Skripsi">Skripsi</option>
                                <option value="Tesis">Tesis</option>
                                <option value="Disertasi">Disertasi</option>
                            </Form.Select>
                            <span className="text-error text-small">
                                {this.state.errors["jenis"]}
                            </span>
                        </Form.Group>

                        <Form.Group className="">
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

                        <Form.Group className="">
                            <Form.Label className="text-large">Abstrak</Form.Label>
                            <Form.Control name="abstrak" as="textarea" rows={8} 
                             value={this.state.abstrak} onChange={this.handleChangeField}/>
                            <span className="text-error text-small">
                                {this.state.errors["abstrak"]}
                            </span>
                        </Form.Group>

                        <Form.Group className="">
                            <Form.Label className="text-large">Unggah karya ilmiah</Form.Label>
                            <Form.Control name="filePDF" type="file" onChange={this.handleFileField}/>
                            <span className="text-error text-small">
                                {this.state.errors["filePDF"]}
                            </span>
                        </Form.Group>

                        <Form.Group className="">
                            <Form.Check type="checkbox" className="text-large" value={this.state.check} onChange={this.handleChangeField}
                            label="Pastikan semua data yang Anda isi sudah benar. 
                            Karya ilmiah yang Anda unggah akan harus diverifikasi oleh dosen pembimbing Anda 
                            terlebih dahulu sebelum ditampilkan untuk umum."/>
                            <span className="text-error text-small">
                                {this.state.errors["check"]}
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