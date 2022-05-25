import React, {useEffect, useState} from "react";
import '../../index.css';
import axios from "axios";
import Box from "@mui/material/Box";
import "@fontsource/mulish";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button'
import AddIcon from '@mui/icons-material/Add';
import AuthenticationDataService from "../../services/authentication.service.js";
import Dasbor from "../dasbor";
import CustomButton from "../custom-button";


import {
  Checkbox,
  Container,
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
import { Link } from "react-router-dom";

const KelolaKaril = () => {
  const [listKaril, setListKaril] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("");
  const [year, setYear] = useState(null);
  const [karilChecked, setKarilChecked] = useState({
    tesis: false,
    skripsiTKA: false,
    disertasi: false,
    nonKaryaAkhir: false,
  });
  const { tesis, skripsiTKA, disertasi, nonKaryaAkhir } = karilChecked;

  useEffect(() => {
    loadUser();
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
    axios.get(url)
      .then(response => {
        setListKaril(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
    
  const handleKarilTypeChange = (event) => {
    setKarilChecked({
      ...karilChecked,
      [event.target.name]: event.target.checked,
    });
  };

  const loadUser = async() =>{
    try {
        let token = localStorage.getItem("ssoui");
        console.log(token);
        token = JSON.parse(token);
        console.log(token);
        if (token !== null){
            const response = await AuthenticationDataService.profile(token);
            console.log(response);
            console.log(response.data.role);
            setRole({role:response.data.role});
        }

    } catch {
        console.log("Load user error!");
    }
  }

  console.log("DATA: ", listKaril)
  return (
    <Dasbor>
      {role.role === "staf" ?
        <Box py={6} px={8} height={'100vh'}>
          <Grid container spacing={8}>
            <Grid item lg={9}>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography fontFamily="Mulish" fontWeight={900} fontSize={28}>
                      Kelola Karya Ilmiah
                    </Typography>

                  <Link to="/karya-ilmiah-saya/upload" style={{textDecoration:"none"}}>
                    <CustomButton variant="primary">
                      <AddIcon/>&nbsp;Tambah Karya Ilmiah
                    </CustomButton>
                  </Link>

                </Box>
                
                <Box my={5}>
                  <TextField
                    label="Cari Karya Ilmiah Berdasarkan Judul, Penulis, atau Kata Kunci"
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
                    }}
                  />
                </Box>
                  
    
                <Box>
                  <Typography>Ditemukan {listKaril.length} Karya Ilmiah</Typography>
                  {/* kasi kondisi kalau di slain staf tampilin hanya status 1, kalau di staf status semua */}
                  {listKaril.map((karil, idx) => 
                    <Box my={3} key={idx}>
                      <CardKaril 
                      data={karil}/>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3}>
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
                    className="react-datepicker"
                  />
                </Box>
                <Box mt={4}>
                  <Typography fontFamily="Mulish" color="#D26930" fontWeight={700}>
                    Tipe Karya Ilmiah
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={skripsiTKA} onChange={handleKarilTypeChange} name="skripsiTKA" />}
                      label="Skripsi-TKA"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={tesis} onChange={handleKarilTypeChange} name="tesis" />}
                      label="Tesis"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={disertasi} onChange={handleKarilTypeChange} name="disertasi" />}
                      label="Disertasi"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={nonKaryaAkhir} onChange={handleKarilTypeChange} name="nonKaryaAkhir" />}
                      label="Non-karya akhir"
                    />
                  </FormGroup>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        : null
      }
    </Dasbor>
  );               
}
// }
export default KelolaKaril;
