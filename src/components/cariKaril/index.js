import React, {Component} from "react";
// import axios from "axios";
import axiosInstance from "axios";

import classes from "./styles.module.css";
import Card from "react-bootstrap/Card";
import DownloadIcon from "@mui/icons-material/Download";
import Box from "@mui/material/Box";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "@fontsource/mulish";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
import CardKaril from "./card-karil.component";
import { Search } from "@mui/icons-material";

const SearchList = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // const search = 'search';
  // const [searchState, setSearch] = React.useState({
  //   search: '',
  //   posts: [],
  // });

  // useEffect(() => {
	// 	axiosInstance.get(search + '/' + window.location.search).then((res) => {
	// 		const allPosts = res.data;
	// 		setAppState({ posts: allPosts });
	// 		console.log(res.data);
	// 	});
	// }, [setAppState]);


  return (
    <Box py={8} px={12}>
      <Grid container spacing={8}>
        <Grid item lg={3}>
          <Box bgcolor="#F8F8F8" p={3}>
            <Typography fontFamily="Mulish" fontSize={20} fontWeight={700}>
              Filter
            </Typography>
            <Box mt={4}>
              <Typography fontFamily="Mulish" color="#D26930" fontWeight={700}>
                Tahun
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Tahun</InputLabel>
                <Select value={age} label="Age" onChange={handleChange}>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mt={4}>
              <Typography fontFamily="Mulish" color="#D26930" fontWeight={700}>
                Tipe Karya Ilmiah
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Skripsi"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Tesis"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Disertasi"
                />
              </FormGroup>
            </Box>
            <Box mt={4}>
              <Typography fontFamily="Mulish" color="#D26930" fontWeight={700}>
                Kategori Topik
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Lorem Ipsum"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Lorem Ipsum"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Lorem Ipsum"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Lorem Ipsum"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Lorem Ipsum"
                />
              </FormGroup>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={9}>
          <Box>
            <Typography fontFamily="Mulish" fontWeight={900} fontSize={28}>
              Hasil Pencarian Karya Ilmiah
            </Typography>
            <Box my={5}>
              <TextField
                label="Cari Karya Ilmiah"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box>
              <Typography>Ditemukan 103 Karya Ilmiah</Typography>
              <Box my={3}>
                <CardKaril />
              </Box>
              <Box my={3}>
                <CardKaril />
              </Box>
              <Box my={3}>
                <CardKaril />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

};

export default SearchList;
