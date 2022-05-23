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
import MetriksUnggahan from './components/metriks/unggahan';
import MetriksPengunjung from './components/metriks/pengunjung';
import MetriksUnduhan from './components/metriks/unduhan';
import EditKaryaIlmiah from './components/edit-karil';
import Metriks from './components/metriks';
import KelolaKaril from './components/kelola-karil';
import UserList from './components/userList';
import FormPengumuman from './components/formPengumuman';
import ListPengumuman from './components/listPengumuman';
import UpdatePengumuman from './components/updatePengumuman'
import DetailPengumuman from './components/detailPengumuman'
import Home from './components/home'
import Bookmark from './components/bookmark'
import MissingPage from './components/missing-page';
import ProfilePage from './components/profilePage';
import KelolaSemester from './components/kelola-semester';

ReactDOM.render(
    <HashRouter>
        <App />
        <Routes>
            <Route path="/KaryaIlmiah/:id" element={<Detail />}/>
            <Route path='/DaftarVerifikasi' element={<DaftarVerifikasi/>}/>
            <Route path="/karya-ilmiah-saya/upload" element={<UploadKaryaIlmiah/>} />
            <Route path="/Search" element={<SeachList/>}/>
            <Route path="/Search/:keyword" element={<SeachList/>}/>
            <Route path="/AdvancedSearch" element={<AdvancedSearch/>}/>
            <Route path="/karya-ilmiah-saya" element={<KaryaIlmiahSaya/>} />
            <Route path="/metriks/unggahan" element={<MetriksUnggahan/>} />
            <Route path="/metriks/pengunjung" element={<MetriksPengunjung/>} />
            <Route path="/metriks/unduhan" element={<MetriksUnduhan/>} />
            <Route path="/edit-karil/:id" element={<EditKaryaIlmiah/>} />
            <Route path="/metriks" element={<Metriks/>}/>
            <Route path="/kelola-karil" element={<KelolaKaril/>}/>
            <Route path="/list-pengumuman" element={<ListPengumuman/>}/>
            <Route path="/kelola-user" element={<UserList/>}/>
            <Route path="/kelola-user/:id" element={<ProfilePage />}/>
            <Route path="/form-pengumuman" element={<FormPengumuman/>}/>
            <Route path="/kelola-pengumuman" element={<ListPengumuman/>}/>
            <Route path="/update-pengumuman/:id" element={<UpdatePengumuman/>}/>
            <Route path="/detail-pengumuman/:id" element={<DetailPengumuman/>}/>
            <Route path="/404" element={<MissingPage/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/karya-ilmiah-favorit" element={<Bookmark/>} />
            <Route path="/kelola-semester" element={<KelolaSemester/>} />
        </Routes>
    </HashRouter>,

    document.getElementById("root")
);
// popUpLogin={this.props.popUpLogin}
