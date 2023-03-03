import {Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React from "react";
import styles from "./App.css"

export function Navigation () {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#home">Logo Here</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <NavDropdown title="Sign In/Sign Up" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Sign In</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Sign Up</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#home">Profile</Nav.Link>
                            <Nav.Link href="#link">My Listings</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}