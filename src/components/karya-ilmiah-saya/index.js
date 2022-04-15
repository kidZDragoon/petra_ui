import React, {Component} from "react";
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../index.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Modal from 'react-bootstrap/Modal'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

export default class KaryaIlmiahSaya extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount()");
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
                    Unggahan Karya Ilmiah
                </p>

              
            </Container>
            
        );
    }
}