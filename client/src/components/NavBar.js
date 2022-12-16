import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../Images/logo/logo.png';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

function NavBar() {

  const { logout, isUser } = useContext(AuthContext);

  return (
    <>
      <Navbar expand="lg" className="NavBar" style={{backgroundColor: "#EDF5E1"}}>
        <Container>
          <Navbar.Brand as={Link} to="/"><img className="logoNav" src={Logo} alt="logo" /></Navbar.Brand>
          <Navbar.Brand as={Link} to="/" className="NavbarBrand">Berlin Fantastic Creatures</Navbar.Brand>
          <NavDropdown title="Menu" id="basic-nav-dropdown">
            {isUser ? <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
              : <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>}
            {!isUser && <NavDropdown.Item as={Link} to="/login">Log In</NavDropdown.Item>}
            <NavDropdown.Item as={Link} to="/city">City</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/ubahn">Ubahn</NavDropdown.Item>
            {isUser && <div>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
            </div>}
          </NavDropdown>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar