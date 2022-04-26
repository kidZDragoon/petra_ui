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
import MetriksUnggahan from './components/metriks/unggahan';
import MetriksPengunjung from './components/metriks/pengunjung';
import MetriksUnduhan from './components/metriks/unduhan';


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
            <Route path="/metriks/unggahan" element={<MetriksUnggahan/>} />
            <Route path="/metriks/pengunjung" element={<MetriksPengunjung/>} />
            <Route path="/metriks/unduhan" element={<MetriksUnduhan/>} />
        </Routes>
    </HashRouter>,

    document.getElementById("root")
);
