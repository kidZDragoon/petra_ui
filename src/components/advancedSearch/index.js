import React from "react";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Box from "@mui/material/Box";
import "@fontsource/mulish";
import Stack from "react-bootstrap/Stack";
import classes from "./styles.module.css";
import AdvSearch from './AdvSearch.svg';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


// import Searching from "../assets/Searching.svg";
import { IconButton } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";

const AdvancedSearch = () => {
  return (
    <div>
      <Stack gap={4}>
        <Container>
        <p className="text-section-header px-0">
          <span class="pull-right">
              <Link to="/" className="pl-0 mx-4 text-orange">
                  <ChevronLeftIcon fontSize="large"></ChevronLeftIcon>
                  </Link>
          </span>
          Advanced Search
      </p>
      
          <Row>
            <Col>
              <div>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Judul Karya Ilmiah</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Judul Karya Ilmiah"
                    />
                  </Form.Group>

                  <Form.Label>Tahun</Form.Label>
                  <Form.Select className="mb-3">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>

                  <Form.Label>Tipe Karya Ilmiah</Form.Label>
                  <Form.Select
                    className="mb-3"
                    aria-label="Default select example"
                  >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>

                  <Form.Label>Kategori</Form.Label>
                  <Form.Select className="mb-3">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form>

                <Button className="primary-btn" variant="primary" type="submit">
                  Cari
                </Button>
              </div>
            </Col>

            <Col>
              <div className="bg-advsearch">
                <img src={AdvSearch} alt="gambar" />
              </div>
            </Col>
          </Row>
        </Container>
      </Stack>
    </div>
  );
};

export default AdvancedSearch;
