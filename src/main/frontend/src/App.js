// import React, {Component} from "react";

import {Component} from 'react';
import {Routes, Route, Link} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from './logo.svg'; // Tell Webpack this JS file uses this image


import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";

class App extends Component {
  // render() {
  //   return ("yes"
  //   );
  // }

  render() {
    return (
        // <img src={logo} />

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
            {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#features">Karya Ilmiah Saya</Nav.Link>
                <Nav.Link href="#pricing">Karya Ilmiah Favorit</Nav.Link>
              </Nav>
              <Nav>
                <Nav>
                  <Link to={"/login"} className="nav-link">Masuk</Link>
                </Nav>
                {/*<NavDropdown title="Masuk" id="collasible-nav-dropdown">*/}
                {/*  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                {/*  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
                {/*  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                {/*  <NavDropdown.Divider />*/}
                {/*  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                {/*</NavDropdown>*/}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>



        // <>
        //     <Navbar bg="light">
        //         <Container>
        //             <Navbar.Brand href="#home">Brand link</Navbar.Brand>
        //         </Container>
        //     </Navbar>
        //     <br />
        //     <Navbar bg="light">
        //         <Container>
        //             <Navbar.Brand>Brand text</Navbar.Brand>
        //         </Container>
        //     </Navbar>
        //     <br />
        //     <Navbar bg="light">
        //         <Container>
        //             <Navbar.Brand href="#home">
        //                 <img
        //                     src={logo}
        //                     width="30"
        //                     height="30"
        //                     className="d-inline-block align-top"
        //                     alt="React Bootstrap logo"
        //                 />
        //             </Navbar.Brand>
        //         </Container>
        //     </Navbar>
        //     <br />
        //     <Navbar bg="light">
        //         <Container>
        //             <Navbar.Brand href="#home">
        //                 <img
        //                     alt=""
        //                     src={logo}
        //                     width="30"
        //                     height="30"
        //                     className="d-inline-block align-top"
        //                 />{' '}
        //                 React Bootstrap
        //             </Navbar.Brand>
        //         </Container>
        //     </Navbar>
        // </>


        // <Navbar bg="light" expand="lg">
        //   <Container>
        //     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //     <Navbar.Collapse id="basic-navbar-nav">
        //       <Nav className="me-auto">
        //         <Nav.Link href="#home">Home</Nav.Link>
        //         <Nav.Link href="#link">Link</Nav.Link>
        //         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        //           <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        //           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        //           <NavDropdown.Divider />
        //           <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        //         </NavDropdown>
        //       </Nav>
        //     </Navbar.Collapse>
        //   </Container>
        // </Navbar>

      // <div>
      //   <nav className="navbar navbar-expand navbar-dark bg-dark">
      //     <a href="/#/tutorials" className="navbar-brand">
      //       Petra
      //     </a>
      //
      //     <div className="navbar-nav mr-auto">
      //       <li className="nav-item">
      //         <Link to={"/tutorials"} className="nav-link">
      //           Tutorials
      //         </Link>
      //       </li>
      //       <li className="nav-item">
      //         <Link to={"/add"} className="nav-link">
      //           Add
      //         </Link>
      //       </li>
      //     </div>
      //   </nav>
      //
      //   <div className="container mt-3">
      //     <Routes>
      //       <Route path="/" element={<TutorialsList/>} />
      //       <Route path="/tutorials" element={<TutorialsList/>} />
      //       <Route path="/add" element={<AddTutorial/>} />
      //       <Route path="/tutorials/:id" element={<Tutorial/>} />
      //     </Routes>
      //   </div>
      // </div>
    );
  }
}

export default App;
