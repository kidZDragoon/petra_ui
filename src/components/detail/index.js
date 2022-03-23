import React, {Component} from "react";
import classes from "./styles.module.css";
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import AccordionBody from 'react-bootstrap/AccordionBody'
import AccordionItem from 'react-bootstrap/AccordionItem'
import AccordionHeader from 'react-bootstrap/AccordionHeader'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import {Files} from "react-bootstrap-icons";
import {BoxArrowDown} from "react-bootstrap-icons";
import {Heart} from "react-bootstrap-icons";
import {HeartFill} from "react-bootstrap-icons";
import axios from "axios";

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            karyaIlmiah: null,
            isOpen:false,
            isCite:false,
            setIsOpen:false,
            isFavorite:false,
            judul:"",
            abstrak:"",
            authors:"",
            jenis:"",
            kategori:[],
            tglVerifikasi:Date,
            url:"",
            APAstyle:"",
            IEEEstyleU:"",
            IEEEstyleL:"",
            MLAstyleU:"",
            MLAstyleL:""
        };
        this.handleDetailKaryaIlimah = this.handleDetailKaryaIlimah.bind(this);
    }
    componentDidMount() {
        const pathname = window.location.href.split("/KaryaIlmiah/")[1];
        console.log(pathname);
        this.handleDetailKaryaIlimah(pathname);
    }
    async handleDetailKaryaIlimah(item,event){
        // event.preventDefault()
        try{
            console.log(item)
            const {data}= await axios.get("/api/karyaIlmiah/"+ item);
            console.log(data)
            this.setState({karyaIlmiah: data, judul: data.judul, abstrak: data.abstrak,
            authors: data.author, jenis: data.jenis, kategori: data.listKategori,
            tglVerifikasi:data.tglVerifikasi})
           
        }catch(error){
            alert("Oops terjadi masalah pada server")
            console.log(error);

        }
    }

    showModal = () => {
        this.setState({isOpen:true})
    };

    favoriteControl = () => {
        this.setState({isFavorite:!this.state.isFavorite})
    };

    hideModal = () => {
        this.setState({isOpen:false})
    };

    showCite = () => {
        this.setState({isCite:true})
        const date = new Date();
        var months = [ " ","January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];
        console.log(this.state.authors.split(" ")[2]);
        console.log(this.state.authors.split(" ")[0].split("")[0]);
        console.log(this.state.authors);
        console.log(this.state.tglVerifikasi.split("-")[0]);
        console.log(months[parseInt(this.state.tglVerifikasi.split("-")[1])]);
        console.log(this.state.tglVerifikasi.split("-")[2]);
        const apaStyleDefault = "";
        const ieeeStyleDefaultU = "";
        const ieeeStyleDefaultL = "";
        const mlaStyleDefaultU= "";
        const mlaStyleDefaultL= "";
        const listname = this.state.authors.split(" ")
        const apaStyle = apaStyleDefault.concat(listname[listname.length-1],", ", this.state.authors.split(" ")[0].split("")[0],
            ". (", this.state.tglVerifikasi.split("-")[0], ", ", months[parseInt(this.state.tglVerifikasi.split("-")[1])], " ", this.state.tglVerifikasi.split("-")[2],
            "). "
        );
        const ieeeStyleU = ieeeStyleDefaultU.concat(listname[0].split("")[0],". ", listname[listname.length-1],", ",);
        const ieeeStyleL = ieeeStyleDefaultL.concat(", Petra, ", months[parseInt(this.state.tglVerifikasi.split("-")[1])], " ", this.state.tglVerifikasi.split("-")[2], ", ",
            this.state.tglVerifikasi.split("-")[0], ".  Accessed on: ", months[date.getMonth()+1], " ", date.getDate(), ", ", date.getFullYear(), ". [Online]."
        );
        const mlaStyleU = mlaStyleDefaultU.concat(listname[listname.length-1], ", ", listname[0], '. "', this.state.judul, '." '
        );
        const mlaStyleL = mlaStyleDefaultL.concat(", ", this.state.tglVerifikasi.split("-")[2], " ", months[parseInt(this.state.tglVerifikasi.split("-")[1])], " ", this.state.tglVerifikasi.split("-")[0],
        ", "
        );
        console.log(apaStyle);
        this.setState({APAstyle:apaStyle, IEEEstyleU:ieeeStyleU,
            IEEEstyleL:ieeeStyleL, MLAstyleU:mlaStyleU, MLAstyleL:mlaStyleL})
    };

    hideCite = () => {
        this.setState({isCite:false})
    };

    render (){
        return (
            <Container id={classes["containerID"]}>
                    <h6>{this.state.jenis}</h6>
                    <h3 id={classes["title"]}>{this.state.judul}</h3>
                    <p className={classes.date}>{this.state.tglVerifikasi}</p>
                    <p>{this.state.authors}</p>
                {/* {this.state.kategori.map((item) => (
                    <button className={classes.roundedPill}>{item.nama}</button>
                    ))} */}

                <div className="d-flex">
                    <button id={classes["features"]} onClick={this.showModal}>
                        <BoxArrowDown/> &nbsp;Unduh PDF
                    </button>
                    <button id={classes["features"]} onClick={this.showCite}>
                        <Files/>&nbsp;Dapatkan Sitasi
                    </button>
                    {this.state.isFavorite == false ? (
                        <button id={classes["features"]} onClick={this.favoriteControl}>
                            <Heart/> &nbsp;Tambahkan ke favorit
                        </button>
                    ):
                        <button id={classes["features"]} onClick={this.favoriteControl}>
                            <HeartFill/> &nbsp;Tambahkan ke favorit
                        </button>
                    }

                </div>
                <Accordion className="accordion" id="accordionPanelsStayOpenExample">
                    <AccordionItem className="accordion-item">
                        <AccordionHeader className="accordion-header" >
                            Abstrak
                            <div className="line"></div>
                        </AccordionHeader>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show"
                             aria-labelledby="panelsStayOpen-headingOne">
                            <AccordionBody className="accordion-body">
                                {this.state.abstrak}
                            </AccordionBody>
                        </div>
                    </AccordionItem>

                </Accordion>

                <Modal className={classes.modal} show={this.state.isOpen} onHide={this.hideModal}>
                    <ModalHeader className={classes.modalHeader} >
                        <h5 className="modal-title" id="exampleModalLongTitle">Apakah anda yakin
                            ingin mengunduh karya ilmiah ini?</h5>
                        <h4 type="button" className={classes.close}  onClick={this.hideModal}>
                            <span aria-hidden="true">&times;</span>
                        </h4>
                    </ModalHeader>
                    <ModalBody className={classes.modalBody}>
                        Penulis karya ilmiah, dosen pembimbing terkait, serta staf akan dapat
                        melihat bahwa anda telah mengunguh karya ilmiah ini.
                    </ModalBody>
                    <ModalFooter className={classes.modalFooter}>
                        <button type="button" className="btn btn-primary" onClick={this.hideModal}
                                id={classes["cancle"]}>Batal</button>
                        <button type="button" className="btn btn-primary" id={classes["accept"]}>Ya</button>
                    </ModalFooter>

                </Modal>

                <Modal className={classes.modal}  show={this.state.isCite} onHide={this.hideCite}>
                    <ModalHeader className={classes.modalCiteHeader} >
                        <h5 className="modal-title" id="exampleModalLongTitle">Sitasi Karya Ilmiah</h5>
                        <h4 type="button" className={classes.closeCite}  onClick={this.hideCite}>
                            <span aria-hidden="true">&times;</span>
                        </h4>
                    </ModalHeader>
                    <ModalBody className={classes.modalBody}>
                        <div className="d-flex">
                            <div className={classes.citeStyle}><b>APA</b></div>
                            <p className={classes.cite}>
                                {this.state.APAstyle}<i>{this.state.judul}. &nbsp;</i>
                                Petra. <br/> {window.location.href}
                            </p>
                        </div>
                        <div className="d-flex">
                            <div className={classes.citeStyle}><b>IEEE</b></div>
                            <p className={classes.cite}>
                                {this.state.IEEEstyleU}<i>{this.state.judul}</i>{this.state.IEEEstyleL}<br/>
                                Available: {window.location.href}
                            </p>
                        </div>
                        <div className="d-flex">
                            <div className={classes.citeStyle}><b>MLA</b></div>
                            <p className={classes.cite}>
                                {this.state.MLAstyleU}<i>Petra</i>{this.state.MLAstyleL}{window.location.href}
                            </p>
                        </div>

                    </ModalBody>

                </Modal>

            </Container>
        )
    }
};
