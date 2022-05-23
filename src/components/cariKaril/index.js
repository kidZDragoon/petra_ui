import React, {useEffect, useState} from "react";
import '../../index.css';
import axios from "axios";
import Box from "@mui/material/Box";
import "@fontsource/mulish";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseIcon from '@mui/icons-material/Close';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CardKaril from "../card/card-karil.component";
import { Search } from "@mui/icons-material";

const SearchList = () => {
  const searchPath = window.location.href.split("/Search/")[1]
  const searchKey = searchPath ? decodeURIComponent(searchPath) : ""
  const [listKaril, setListKaril] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [keyword, setKeyword] = useState(searchKey);
  const [year, setYear] = useState(null);
  const [foundKaril, setFoundKaril] = useState([]);
  const [karilChecked, setKarilChecked] = useState({
    tesis: false,
    skripsi: false,
    disertasi: false,
    nonskripsi: false,
  });
  const { tesis, skripsi, disertasi, nonskripsi } = karilChecked;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchKaril();
    hitungPenemuan();
  },[keyword, year, karilChecked])

  const getKarilQuery = () => {
    let karilType = [];
    if (tesis) karilType.push('Tesis');
    if (skripsi) karilType.push('Skripsi');
    if (disertasi) karilType.push('Disertasi');
    if (nonskripsi) karilType.push('Non-skripsi');
    let query = karilType.join();
    return query;
  }

  const fetchKaril = async () => {
    let karilType = getKarilQuery();
    let url = `/api/search/?search=${keyword}&tahun=${(year ? year.getFullYear() : "")}&jenis=${karilType}`
    let newList = []
    axios.get(url)
      .then(response => {
        setListKaril(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  }
    
  const hitungPenemuan = () => {
    let newList = []
    console.log("liskaril", listKaril.length)
    listKaril.map((item)=>
    item.status == 1 ? newList.push(item) : null);
    setFoundKaril(newList)
    console.log("penemuan", foundKaril.length)
  }

  const handleKarilTypeChange = (event) => {
    setKarilChecked({
      ...karilChecked,
      [event.target.name]: event.target.checked,
    });
  };

  const showFilter = () => {
    setIsShow(true);
  }

  const hideFilter = () => {
    setIsShow(false);
  }

  // listKaril.map((item)=>
  //   item.status == 1 ? foundKaril.includes(item) ? null : foundKaril.push(item) : null);

  return (
    <Container>
      <Container className="content-box">
          <Grid container spacing={8}>
          <Grid item lg={3} sx={{ display: { xs: "none", lg: "block" } }}>
            <Box bgcolor="#F8F8F8" p={3}>
              <Typography fontFamily="Mulish" fontSize={20} fontWeight={700}>
                Filter
              </Typography>
              <Box mt={4}>
                <Typography fontFamily="Mulish" color="#D26930" fontWeight={700}>
                  Tahun Publikasi
                </Typography>
                <DatePicker
                  selected={year}
                  onChange={(date) => setYear(date)}
                  showYearPicker
                  dateFormat="yyyy"
                  className="react-datepicker" />
              </Box>
              <Box mt={4}>
                <Typography fontFamily="Mulish" color="#D26930" fontWeight={700}>
                  Tipe Karya Ilmiah
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={skripsi} onChange={handleKarilTypeChange} name="skripsi" />}
                    label="Skripsi" />
                  <FormControlLabel
                    control={<Checkbox checked={tesis} onChange={handleKarilTypeChange} name="tesis" />}
                    label="Tesis" />
                  <FormControlLabel
                    control={<Checkbox checked={disertasi} onChange={handleKarilTypeChange} name="disertasi" />}
                    label="Disertasi" />
                  <FormControlLabel
                    control={<Checkbox checked={nonskripsi} onChange={handleKarilTypeChange} name="nonskripsi" />}
                    label="Non-skripsi" />
                </FormGroup>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={9}>
            <Box>
              <Typography fontFamily="Mulish" fontWeight={900} fontSize={{ xs: 20, md: 28 }}>
                Hasil Pencarian Karya Ilmiah
              </Typography>
              <Box my={5}>
                <TextField
                  label="Cari Karya Ilmiah"
                  helperText="Pencarian berdasarkan Judul, Penulis, atau Kata Kunci"
                  fullWidth
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    style: { borderRadius: 8 }
                  }} />
              </Box>
              <Box my={2} sx={{ display: { xs: "block", lg: "none" } }}>
                <Button className="btn-no-outline" onClick={showFilter}>
                  <FilterAltIcon></FilterAltIcon> Filter
                </Button>
              </Box>
              <Box>
                <Typography>Ditemukan {listKaril.length} Karya Ilmiah</Typography>
                {listKaril.map((karil, idx) => <Box my={3} key={idx}>
                  {karil.status == 1
                    ? <CardKaril
                      data={karil} />
                    : null}
                </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

    <Modal className="modal" show={isShow} onHide={hideFilter}>
      <Container className="px-5 pt-2 pb-4">
        <Row>
          <Col className="justify-content-end text-end">
            <h4 type="button" className="" onClick={hideFilter}>
              <span><CloseIcon fontsize="small"></CloseIcon></span>
            </h4>
          </Col>
        </Row>
        <Row className="mt-1">
          <Box p={3}>
            <Typography fontFamily="Mulish" fontSize={20} fontWeight={700}>
              Filter
            </Typography>
            <Box mt={4}>
              <Typography fontFamily="Mulish" color="#D26930" fontWeight={700}>
                Tahun Publikasi
              </Typography>
              <DatePicker
                selected={year}
                onChange={(date) => setYear(date)}
                showYearPicker
                dateFormat="yyyy"
                className="react-datepicker" />
            </Box>
            <Box mt={4}>
              <Typography fontFamily="Mulish" color="#D26930" fontWeight={700}>
                Tipe Karya Ilmiah
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={skripsi} onChange={handleKarilTypeChange} name="skripsi" />}
                  label="Skripsi" />
                <FormControlLabel
                  control={<Checkbox checked={tesis} onChange={handleKarilTypeChange} name="tesis" />}
                  label="Tesis" />
                <FormControlLabel
                  control={<Checkbox checked={disertasi} onChange={handleKarilTypeChange} name="disertasi" />}
                  label="Disertasi" />
                <FormControlLabel
                  control={<Checkbox checked={nonskripsi} onChange={handleKarilTypeChange} name="nonskripsi" />}
                  label="Non-skripsi" />
              </FormGroup>
            </Box>
          </Box>
        </Row>
      </Container>
    </Modal>
    </Container>
    
    
    
  );               
}
export default SearchList;
