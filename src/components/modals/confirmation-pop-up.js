import React from "react";
import '../../index.css';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseIcon from '@mui/icons-material/Close';

const ConfirmationPopUp = (props) => {
    const { show, hide, action, title, content } = props;

    return (
        <Modal className="modal" show={show} onHide={hide}>
            <Container className="px-5 pt-2 pb-4">
                <Row>
                    <Col className="justify-content-end text-end">
                        <h4 type="button" className=""  onClick={hide}>
                            <span><CloseIcon fontsize="small"></CloseIcon></span>
                        </h4>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col sm={12}>
                        <h5 className="modal-title text-bold-title mb-2" id="exampleModalLongTitle">
                            {title}
                        </h5>
                        <div class="modalBody mb-2 text-disabled">
                            <p>{content}</p>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col className="d-flex justify-content-start">
                        <button type="button" className="btn cancel mr-3 text-bold-large" onClick={hide}>Batal</button>
                        <button type="submit" className="btn accept mr-3 text-bold-large" id="" onClick={action}>Ya</button>
                    </Col>
                </Row>
            </Container>
        </Modal>
    );
};

export default ConfirmationPopUp;
