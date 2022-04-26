import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Detail from "./components/detail";
import KaryaIlmiahSaya from './components/karya-ilmiah-saya';
import DaftarVerifikasi from './components/verifikasi';
import UploadKaryaIlmiah from "./components/unggah-karya-ilmiah";
import SearchList from "./components/cariKaril";
import AdvancedSearch from './components/advancedSearch';
import EditKaryaIlmiah from './components/edit-karil';
import Metriks from './components/metriks';
import KelolaKaril from './components/kelola-karil';

ReactDOM.render(
    <HashRouter>
        <App />
        <Routes>
            <Route path="/KaryaIlmiah/:id" element={<Detail/>}/>
            <Route path='/DaftarVerifikasi' element={<DaftarVerifikasi/>}/>
            <Route path="/karya-ilmiah-saya/upload" element={<UploadKaryaIlmiah/>} />
            <Route path="/Search" element={<SearchList/>}/>
            <Route path="/AdvancedSearch" element={<AdvancedSearch/>}/>
            <Route path="/karya-ilmiah-saya" element={<KaryaIlmiahSaya/>} />
            <Route path="/edit-karil/:id" element={<EditKaryaIlmiah/>} />
            <Route path="/metriks" element={<Metriks/>}/>
            <Route path="/kelola-karil" element={<KelolaKaril/>}/>

            {/* <Route path="/sidebar" element={<DashboardSidebar/>}/> */}
        </Routes>
    </HashRouter>,

    document.getElementById("root")
);
