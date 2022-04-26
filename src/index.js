import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Detail from "./components/detail";
import KaryaIlmiahSaya from './components/karya-ilmiah-saya';
import DaftarVerifikasi from './components/verifikasi';
import UploadKaryaIlmiah from "./components/unggah-karya-ilmiah";
import SeachList from "./components/cariKaril";
import AdvancedSearch from './components/advancedSearch';
import UserList from './components/userList';
import FormPengumuman from './components/formPengumuman';
import ListPengumuman from './components/listPengumuman';
import UpdatePengumuman from './components/updatePengumuman'
import DetailPengumuman from './components/detailPengumuman'
import Home from './components/home'

ReactDOM.render(
    <HashRouter>
        <App />
        <Routes>
            <Route path="/KaryaIlmiah/:id" element={<Detail />}/>
            <Route path='/DaftarVerifikasi' element={<DaftarVerifikasi/>}/>
            <Route path="/karya-ilmiah-saya/upload" element={<UploadKaryaIlmiah/>} />
            <Route path="/Search" element={<SeachList/>}/>
            <Route path="/AdvancedSearch" element={<AdvancedSearch/>}/>
            <Route path="/karya-ilmiah-saya" element={<KaryaIlmiahSaya/>} />
            <Route path="/list-user" element={<UserList/>}/>
            <Route path="/form-pengumuman" element={<FormPengumuman/>}/>
            <Route path="/list-pengumuman" element={<ListPengumuman/>}/>
            <Route path="/update-pengumuman/:id" element={<UpdatePengumuman/>}/>
            <Route path="/detail-pengumuman/:id" element={<DetailPengumuman/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    </HashRouter>,

    document.getElementById("root")
);
// popUpLogin={this.props.popUpLogin}