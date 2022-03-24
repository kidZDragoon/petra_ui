import React, {useState} from "react";
import '../../index.css';
import Card from "react-bootstrap/Card";
import DownloadIcon from "@mui/icons-material/Download";
import Box from "@mui/material/Box";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {BoxArrowDown} from "react-bootstrap-icons";
import classes from "./styles.module.css";
import {Link} from "react-router-dom";

const CardKaril = ({data}) => {
  // const{judul, jenis, authors, tglVerifikasi} = props;
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <Card style={{}}>
      <Card.Body>
        <Row>
          <Card.Subtitle className="mb-2 text-muted">{data.jenis}</Card.Subtitle>
          <Card.Title><Link to={`/KaryaIlmiah/${data.id}`} className="link">{data.judul}</Link></Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{data.tglDisetujui}</Card.Subtitle>
          <Card.Text>{data.author}</Card.Text>
        </Row>
        <Row>
          <Card.Link id={classes["features"]}>
            <BoxArrowDown/> &nbsp;Unduh PDF
          </Card.Link>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CardKaril;
