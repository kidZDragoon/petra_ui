import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Detail from "./components/detail";
import KaryaIlmiahSaya from './components/karya-ilmiah-saya';
import UploadKaryaIlmiah from "./components/unggah-karya-ilmiah";

ReactDOM.render(
    <HashRouter>
        <App />
        <Routes>
            <Route>
            <Route path="/KaryaIlmiah/:id" element={<Detail/>}/>
            <Route path="/karya-ilmiah-saya/upload" element={<UploadKaryaIlmiah/>} />
            <Route path="/karya-ilmiah-saya" element={<KaryaIlmiahSaya/>} />
            </Route>
        </Routes>
    </HashRouter>,

    document.getElementById("root")
);


