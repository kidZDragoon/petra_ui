import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Detail from "./components/detail";
import DaftarVerifikasi from './components/verifikasi';
import UploadKaryaIlmiah from "./components/unggah-karya-ilmiah";

ReactDOM.render(
    <HashRouter>
        <App />
        <Routes>
            <Route>
            <Route path="/KaryaIlmiah/:id" element={<Detail/>}/>
            <Route path='/DaftarVerifikasi' element={<DaftarVerifikasi/>}/>
            <Route path="/karya-ilmiah-saya/upload" element={<UploadKaryaIlmiah/>} />
            </Route>
        </Routes>
    </HashRouter>,

    document.getElementById("root")
);
