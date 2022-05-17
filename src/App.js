import React from 'react';
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import VisitorTrackingService from "./services/visitorTracking.service"
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import AuthenticationDataService from "./services/authentication.service";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';


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
            console.log('token: ', token)
            AuthenticationDataService.user(token)
                .then(response => {
                    console.log('masuk then')
                    this.setState({
                        username: response.data.username,
                        full_name: response.data.first_name + ' ' + response.data.last_name,
                        email: response.data.email,
                        loggedIn: true,
                    });
                    // document.getElementById("login").innerHTML = ''
                    // document.getElementById("logout").innerHTML = 'Halo, ' + this.state.full_name
                })
            VisitorTrackingService.countVisit()
            this.loadUser()
            console.log("cdu login:", this.state.loggedIn)
        } catch {}
    }

    popUpLogin() {
        const serviceURL = "http://localhost:8000/login/"
        // const serviceURL = "https://propensi-a03-staging.herokuapp.com/login/"
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
                    window.location.reload()
                },
                {
                    once: true
                }
            )
        })
    }

    async logout() {
        let token = localStorage.getItem("ssoui");
        token = JSON.parse(token);

        this.setState({
            username: "",
            full_name: "",
            email: "",
            loggedIn: false,
        })
        localStorage.removeItem("ssoui")

        const SSOWindow = window.open(
            new URL(
                `https://sso.ui.ac.id/cas2/logout`
            ).toString(),
            "SSO UI Logout",
            "left=50, top=50, width=480, height=480"
        )

        const response = await AuthenticationDataService.profile(token);

        SSOWindow.close()

        window.location.reload()
    }

    async loginHandler() {
        const data = await this.popUpLogin()
        // document.getElementById("login").innerHTML = ''
        // document.getElementById("logout").innerHTML = 'Halo, ' + data['nama']
        localStorage.setItem("ssoui", JSON.stringify(data))
    }

    async loadUser(){
        try {
            let token = localStorage.getItem("ssoui");
            token = JSON.parse(token);
            if (token !== null){
                console.log('load user w token')
                const response = await AuthenticationDataService.profile(token);
                this.setState({role:response.data.role});
                this.setState({loggedIn: true,})
            }
            console.log("lu login: ", this.state.loggedIn)
            console.log("role: ", this.state.role)
        } catch {
            console.log("Load user error!");
        }
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
                                    alt="React Bootstrap logo" />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            {this.state.role === "staf" ?
                                <Nav className="me-auto">
                                    <Nav.Link href="#/metriks/pengunjung">Dasbor</Nav.Link>
                                    <Nav.Link href="#/karya-ilmiah-favorit">Karya Ilmiah Favorit</Nav.Link>
                                    <Nav.Link href="#/Search">Pencarian</Nav.Link>
                                </Nav>
                                :
                                <Nav className="me-auto">
                                    <Nav.Link href="#/karya-ilmiah-saya">Karya Ilmiah Saya</Nav.Link>
                                    <Nav.Link href="#/karya-ilmiah-favorit">Karya Ilmiah Favorit</Nav.Link>
                                    <Nav.Link href="#/Search">Pencarian</Nav.Link>
                                </Nav>}

                            <Nav>
                                {this.state.loggedIn ?
                                    <NavDropdown title={"Halo, " + this.state.full_name} id="logout">
                                        <NavDropdown.Item onClick={this.logout}>
                                            <LogoutIcon fontSize="small" /> Keluar
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    : <Nav.Link id="login" onClick={this.loginHandler}>Masuk</Nav.Link>}
                            </Nav>


                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default App;
