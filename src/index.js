import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Routes, Route} from "react-router-dom";
import App from "./App";

ReactDOM.render(
    <HashRouter>
    <App />
    <Routes>
        <Route path="/KaryaIlmiah/:id" element={<Detail/>}/>
        <Route path="/VerifikasiKaryaIlmiah" element={<Detail/>}></Route>
    </Routes>
    </HashRouter>,

    document.getElementById("root")

);



