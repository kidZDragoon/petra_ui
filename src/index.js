import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Detail from "./components/detail";
import SeachList from "./components/cariKaril";
import AdvancedSearch from './components/advancedSearch';


ReactDOM.render(
    <HashRouter>
        <App />
        <Routes>
            <Route>
            <Route path="/KaryaIlmiah/:id" element={<Detail/>}/>
            <Route path="/Search" element={<SeachList/>}/>
            <Route path="/AdvancedSearch" element={<AdvancedSearch/>}/>
            
            </Route>
        </Routes>
    </HashRouter>,

    document.getElementById("root")
);


