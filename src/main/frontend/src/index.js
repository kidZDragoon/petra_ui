import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter, Routes, Route
} from "react-router-dom";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import Login from "./components/login";

ReactDOM.render(
    <HashRouter>
        <App />
        <Routes>
            <Route path="/" element={<TutorialsList/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/tutorials" element={<TutorialsList/>} />
            <Route path="/add" element={<AddTutorial/>} />
            <Route path="/tutorials/:id" element={<Tutorial/>} />
        </Routes>
    </HashRouter>,

    document.getElementById("root")
);


