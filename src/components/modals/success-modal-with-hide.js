import React from "react";
import '../../index.css';

import {
    Modal,
    Container,
    Row,
    Col,
    Button,
} from 'react-bootstrap';

import {Link} from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SuccessModalWithHide = (props) => {
    const { hide, show, title, content, buttonText } = props;

    return (
        <Modal className="modal" show={show} onHide={hide}>
            <Container className="px-4 pt-2 pb-4">
                <Row className="pt-4">
                    <Col sm={2}>
                        <div className="check-container text-white d-flex justify-content-center align-items-center">
                            <CheckCircleIcon fontSize="large" color="white"></CheckCircleIcon>
                        </div>
                    </Col>
                    <Col sm={10}>
                        <h5 className="modal-title text-bold-large mb-2" id="exampleModalLongTitle">{title}</h5>
                        <div className="modalBody mb-2 text-normal">
                            <p>{content}</p>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col className="">
                        <Button className="btn btn-full-width btn-orange text-bold-large" onClick={hide}>
                            <span>{buttonText}</span>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Modal>
    );
};

export default SuccessModalWithHide;
