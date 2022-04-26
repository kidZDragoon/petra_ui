import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { ThreeDots } from "react-bootstrap-icons";
import { ChevronRight, PencilSquare, TrashFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom"
import { Dropdown } from "react-bootstrap";
import classes from "./styles.module.css";
import axios from "axios";
import ConfirmationPopUp from '../modals/confirmation-pop-up';
import SuccessModalWithButton from "../modals/success-modal-with-button";

export default class CardPengumuman extends Component{
    // 
    constructor(props) {
        super(props);
        this.deletePengumuman = this.deletePengumuman.bind(this);
        this.showConfirmation = this.showConfirmation.bind(this);
        this.hideConfirmation = this.hideConfirmation.bind(this);
        this.showSuccessModal = this.showSuccessModal.bind(this);
        this.state = {
            judul:"",
            tglDibuat:Date,
            pesan:"",
            id:"",
            isDelete:false,
            successModal:false,
            message:"",
            title:"",
            
        }
        this.state.pesan = props.pesan
        this.state.judul = props.judul
        this.state.tglDibuat = props.tglDibuat
        this.state.id = props.id
        
    }

    async deletePengumuman(id){
        await axios.delete("/api/pengumuman/" + id);
        this.props.deleteHandler()
            
    }

    showSuccessModal = () => {
        this.setState({successModal:true, message:"Pengumuman dengan judul '"+this.state.judul+"' berhasil dihapus" })
    };

    showConfirmation(){
        console.log("masuk show confirmation")
        this.setState({isDelete:true, title:"Hapus pengumuman dengan judul '"+this.state.judul+"'?"})
    
    };

    hideConfirmation(){
        this.setState({isDelete:false})
    };
    

    render(){
        const {judul, tglDibuat, pesan, id, deleteHandler, isStaf} = this.props;
        return(
            <div>
                {isStaf === true ?
                <div>
                    <ConfirmationPopUp action={() => this.deletePengumuman(id)}
                        show={this.state.isDelete}
                        hide={this.hideConfirmation}
                        title={this.state.title}
                        content="Dengan menghapus pengumuman, maka seluruh pengguna tidak dapat melihat pengumuman ini">
                </ConfirmationPopUp>
                <SuccessModalWithButton show={this.state.successModal}
                                        title="Pengumuman berhasil dihapus"
                                        content={this.state.message}
                                        buttonText="Lihat daftar pengumuman"
                                        link="/list-pengumuman" >
                </SuccessModalWithButton>
                </div>
                : 
                    <div></div>
                }
                
            <Card className={classes.card}>
                <Card.Body>
                    <Row>
                    <div className="d-flex justify-content-between">
                        <Card.Title className={classes.title}>{judul}</Card.Title>
                        {isStaf === true ?
                            <Dropdown className="dropdown">
                                <Dropdown.Toggle  variant="link" bsPrefix="p-0" align={{ lg: 'start' }}>
                                    <ThreeDots fontSize={"30px"} className="dropbtn"/>
                                </Dropdown.Toggle>
                                
                                <Dropdown.Menu className="dropdown-content"  id={classes["drp-content"]} >
                                    <Link to={"/update-pengumuman/" + id} className="d-flex flex-row"
                                    id={classes["edit"]}><PencilSquare/>&nbsp;Edit</Link>
                                    <div className={classes.line}></div>
                                    <div onClick={this.showConfirmation} className="d-flex flex-row"
                                    id={classes["hapus"]}><TrashFill/>&nbsp;Hapus</div>
                                </Dropdown.Menu>
                            </Dropdown>
                        : <div></div>
                        }
                    </div>
                    <Card.Subtitle className="mb-2 text-muted" id={classes["date"]}>{tglDibuat}</Card.Subtitle>
                    <div className={classes.line}></div>
                    <Card.Text className={classes.pesan}> {pesan} </Card.Text>
                    </Row>
                    <Row>
                    <Link to={"/detail-pengumuman/" + id} className={classes.detail}>
                        Lihat selengkapnya &nbsp; <ChevronRight/>
                    </Link>
                    </Row>
                </Card.Body>
            </Card>
            </div>
            
        )
    }
   
}