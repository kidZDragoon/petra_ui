import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter, Routes, Route
} from "react-router-dom";
import App from "./App";
import Login from "./components/login";

ReactDOM.render(
    <HashRouter>
        <App />
        <Routes>
            {/*<Route path="/" element={<TutorialsList/>} />*/}
            <Route path="/login" element={<Login/>} />
            {/*<Route path="/tutorials" element={<TutorialsList/>} />*/}
            {/*<Route path="/add" element={<AddTutorial/>} />*/}
            {/*<Route path="/tutorials/:id" element={<Tutorial/>} />*/}
        </Routes>
    </HashRouter>,

    document.getElementById("root")
);


