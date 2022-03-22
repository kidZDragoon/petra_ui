import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Detail from "./components/detail";

ReactDOM.render(
    <HashRouter>
        <App />
        <Routes>
            <Route>
            <Route path="/KaryaIlmiah/:id" element={<Detail/>}/>
            </Route>
        </Routes>
    </HashRouter>,

    document.getElementById("root")
);


