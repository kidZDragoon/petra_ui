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
import { Pagination } from "@material-ui/lab";
import BarLoader from "react-spinners/BarLoader";

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
  const [isShow, setIsShow] = useState(false);
  const [keyword, setKeyword] = useState(searchKey);
  const [year, setYear] = useState(null);
  const [foundKaril, setFoundKaril] = useState([]);
  const [karilChecked, setKarilChecked] = useState({
    tesis: false,
    skripsiTKA: false,
    disertasi: false,
    nonKaryaAkhir: false,
  });
  const { tesis, skripsiTKA, disertasi, nonKaryaAkhir } = karilChecked;
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [listKarilBaru, setListKarilBaru] = useState([]);


  useEffect(() => {
    fetchKaril();
  },[keyword, year, karilChecked])

  const getKarilQuery = () => {
    let karilType = [];
    if (tesis) karilType.push('Tesis');
    if (skripsiTKA) karilType.push('Skripsi-TKA');
    if (disertasi) karilType.push('Disertasi');
    if (nonKaryaAkhir) karilType.push('Non-karya akhir');
    let query = karilType.join();
    return query;
  }

  const fetchKaril = async () => {
    let karilType = getKarilQuery();
    let url = `/api/search/?search=${keyword}&tahun=${(year ? year.getFullYear() : "")}&jenis=${karilType}`
    var totalPages = 0;
    axios.get(url)
      .then(response => {
        setFoundKaril((response.data).filter((item)=> item.status == 1));
        setListKarilBaru(((response.data).filter((item)=> item.status == 1)).slice(0,5));

        if(response.data.length/5 - Math.round(response.data.length/5) > 0){
            totalPages = Math.round(response.data.length/5) + 1;
            setTotalPage(totalPages);
        }else{
            totalPages = Math.round(response.data.length/5)
            setTotalPage(totalPages);
        }


      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
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

  const handleChangePage = (event, value) => {
    var karil = foundKaril;
    karil = karil.slice((5*value)-5,5*value);
    setListKarilBaru(karil)
    console.log("karil: ", listKarilBaru.length)
    document.getElementById("judul").scrollIntoView();
  }

  return (
    
    <Container>
      {isLoading ?
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
        >
            <BarLoader color="#d26903" loading={isLoading} css="" size={100} />               
        </Box>
                
        :  
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
                        control={<Checkbox checked={skripsiTKA} onChange={handleKarilTypeChange} name="skripsiTKA" />}
                        label="Skripsi-TKA" />
                      <FormControlLabel
                        control={<Checkbox checked={tesis} onChange={handleKarilTypeChange} name="tesis" />}
                        label="Tesis" />
                      <FormControlLabel
                        control={<Checkbox checked={disertasi} onChange={handleKarilTypeChange} name="disertasi" />}
                        label="Disertasi" />
                      <FormControlLabel
                        control={<Checkbox checked={nonKaryaAkhir} onChange={handleKarilTypeChange} name="nonKaryaAkhir" />}
                        label="Non-karya akhir" />
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
                    <Typography>Ditemukan {foundKaril.length} Karya Ilmiah</Typography>
                    {listKarilBaru.map((karil, idx) => <Box my={3} key={idx}>
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
            <Pagination onChange={handleChangePage} count={totalPage} size="large" class="d-flex justify-content-center"
            id="pagination"/>
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
                      control={<Checkbox checked={skripsiTKA} onChange={handleKarilTypeChange} name="skripsiTKA" />}
                      label="Skripsi-TKA" />
                    <FormControlLabel
                      control={<Checkbox checked={tesis} onChange={handleKarilTypeChange} name="tesis" />}
                      label="Tesis" />
                    <FormControlLabel
                      control={<Checkbox checked={disertasi} onChange={handleKarilTypeChange} name="disertasi" />}
                      label="Disertasi" />
                    <FormControlLabel
                      control={<Checkbox checked={nonKaryaAkhir} onChange={handleKarilTypeChange} name="nonKaryaAkhir" />}
                      label="Non-karya akhir" />
                  </FormGroup>
                </Box>
              </Box>
            </Row>
          </Container>
        </Modal>
      </Container>
    }
    </Container>
    
    
    
  );               
}
export default SearchList;
