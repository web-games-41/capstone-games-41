import {Button, Container, Form, Image, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React, {useState} from "react";
import "./App.css"
import messageIcon from "./img/messageIcon.png"
import Logo from "./img/tossMeAGameLogo.png"

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

            <Navbar expand="lg">
                <Container>
                    <a href="/" className={'fs-4'}>
                    <Image className={"rounded"} fluid width={"50px"} src={Logo} alt={"Toss Me A Game Logo"} /> Toss Me A Game</a>

                    <Navbar.Toggle/>
                        <Navbar.Collapse className="justify-content-end pe-2">
                            <Nav>
                                <Image fluid className={"d-xs-flex"} width={"30px"} src={messageIcon} alt={"Message Icon"} />
                            </Nav>
                            <Nav>
                                <NavDropdown title="Sign In/Sign Up" id="basic-nav-dropdown">
                                    <Button variant='secondary' onClick={handleShow} id='signin'>
                                        Sign In
                                    </Button>
                                    <NavDropdown.Item href="/sign-up">Sign Up</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <Nav.Link href="#link">My Listings</Nav.Link>
                            </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}