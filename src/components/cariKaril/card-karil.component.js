import React, {Component} from "react";
import classes from "./styles.module.css";
import Card from "react-bootstrap/Card";
import DownloadIcon from "@mui/icons-material/Download";
import Box from "@mui/material/Box";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CardKaril = () => {
// export default class CarkKaril extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         karyaIlmiah: null,
//         isFavorite:false,
//         judul:"",
//         authors:"",
//         jenis:"",
//         tglVerifikasi:Date,
//     };
//     this.handleCariKaryaIlimah = this.handleCariKaryaIlimah.bind(this);
// }
// componentDidMount() {
//   const pathname = window.location.href.split("/Search/");
//   console.log(pathname);
//   this.handleCariKaryaIlimah(pathname);
// }

  //render(){
    return (
      <Card style={{}}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">Skripsi</Card.Subtitle>
          <Card.Title>
            The customer retail app experience: Implications for customer loyalty
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            9 Desember 2022
          </Card.Subtitle>
          <Card.Text>
            Farah Mumtaza Budiawan, Fikra Shafna Rahmania, Rizma Chaerani
          </Card.Text>

          <Row>
            <Col>
              <Card.Link href="#">
                <Box display="flex" alignItems="center">
                  <DownloadIcon color="#d26930" fontSize="small" />
                  <p class="text-normal">Unduh</p>
                </Box>
              </Card.Link>
            </Col>
            <Col>
              <Card.Link href="#">
                <Box display="flex" alignItems="center">
                  <p class="text-normal" color="#d26930">
                    Abstrak
                  </p>
                  <KeyboardArrowDownIcon color="#d26930" fontSize="medium" />
                </Box>
              </Card.Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  //}
};

export default CardKaril;
