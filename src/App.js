import React from 'react';
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import AuthenticationDataService from "./services/authentication.service";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.popUpLogin = this.popUpLogin.bind(this)
        this.logout = this.logout.bind(this)
        this.loginHandler = this.loginHandler.bind(this)
        this.state = {
            username: "",
            full_name: "",
            email: "",
            loggedIn: false,
        }
    }

    componentDidMount() {
        try {
            let token = localStorage.getItem("ssoui")
            token = JSON.parse(token)
            AuthenticationDataService.user(token)
                .then(response => {
                    this.setState({
                        username: response.data.username,
                        full_name: response.data.first_name + ' ' + response.data.last_name,
                        email: response.data.email,
                        loggedIn: true,
                    });
                    document.getElementById("login").innerHTML = ''
                    document.getElementById("logout").innerHTML = 'Halo, ' + this.state.full_name
                })
        } catch {}
    }

    popUpLogin() {
        // const serviceURL = "http://localhost:8000/login/"
        const serviceURL = "https://propensi-a03-staging.herokuapp.com/login/"
        // const serviceURL = "https://propensi-a03.herokuapp.com/login/"

        const SSOWindow = window.open(
            new URL(
                `https://sso.ui.ac.id/cas2/login?service=${encodeURIComponent(serviceURL)}`
            ).toString(),
            "SSO UI Login",
            "left=50, top=50, width=480, height=480"
        )

        return new Promise(function (resolve) {
            window.addEventListener(
            "message", (e) => {
                    if (SSOWindow) {
                        SSOWindow.close()
                    }
                    const data = e.data
                    resolve(data)
                },
                {
                    once: true
                }
            )
        })
    }

    logout() {
        let token = localStorage.getItem("ssoui")
        token = JSON.parse(token)
        AuthenticationDataService.user(token)
            .then(() => {
                this.setState({
                    username: "",
                    full_name: "",
                    email: "",
                    loggedIn: false,
                })
                localStorage.removeItem("ssoui")
                window.location.reload()
            })
    }

    async loginHandler() {
        const data = await this.popUpLogin()
        document.getElementById("login").innerHTML = ''
        document.getElementById("logout").innerHTML = 'Halo, ' + data['nama']
        localStorage.setItem("ssoui", JSON.stringify(data))
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Container>
                        <Navbar.Brand>
                            <Link to={"/"} className="nav-link">
                            <img
                                src={logo}
                                width="90"
                                height="45"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#/KaryaIlmiah/1">Contoh</Nav.Link>
                                <Nav.Link href="#/karya-ilmiah-saya/upload">Upload</Nav.Link>
                                <Nav.Link href="#/DaftarVerifikasi">Daftar Verifikasi</Nav.Link>
                                <Nav.Link href="#/Search">Search</Nav.Link>
                                <Nav.Link href="#/AdvancedSearch">Advanced Search</Nav.Link>
                            </Nav>

                            <Nav>
                                <Nav.Link id="login" onClick={this.loginHandler}>Masuk</Nav.Link>
                                <Nav.Link id="logout" onClick={this.logout}/>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default App;
