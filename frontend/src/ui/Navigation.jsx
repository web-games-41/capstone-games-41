import {Button, Container, Form, Image, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React, {useState} from "react";
import styles from "./App.css"

export function Navigation () {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Form className='p-5'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="secondary" type="submit" className='me-2'>
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Form>
            </Modal>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/">Logo Here</Navbar.Brand>
                    <Nav>
                        <img
                            alt=""
                            src="https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder-1024x1024.png"
                            height="30"
                        />
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <NavDropdown title="Sign In/Sign Up" id="basic-nav-dropdown">
                                <Button variant='secondary' onClick={handleShow} id='signin'>
                                    Sign In
                                </Button>
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