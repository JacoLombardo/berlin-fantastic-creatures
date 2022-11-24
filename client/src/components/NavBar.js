import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../Images/logo/logo.png';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/"><img className="logoNav" src={Logo} alt="logo" /></Navbar.Brand>
          <Navbar.Brand as={Link} to="/">Berlin Fantastic Creatures</Navbar.Brand>
          <NavDropdown title="Menu" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Log Out</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/login">Log In</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/city">City</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/ubahn">Ubahn</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar