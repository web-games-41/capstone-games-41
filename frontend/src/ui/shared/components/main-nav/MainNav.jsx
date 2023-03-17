import {Button, Container, Form, Image, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React, {useState} from "react";
import "../../../App.css"
import messageIcon from "../../../img/messageIcon.png"
import Logo from "../../../img/tossMeAGameLogo.png"
import {SignInModal} from "./sign-in/SigninModal";
import {SignOutComponent} from "./SignOut";

export function Navigation () {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <>
            <Navbar expand="lg">
                <Container>
                    <a href="/" className={'fs-4'}>
                        <Image className={"rounded"} fluid width={"50px"} src={Logo} alt={"Toss Me A Game Logo"} /> Toss Me A Game</a>

                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end p-2">
                        <Nav>
                            <a href='/message'>
                                <Image fluid className={"d-xs-flex"} width={"30px"} src={messageIcon} alt={"Message Icon"} /> </a>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Sign In/Sign Up" id="basic-nav-dropdown">
                                <SignInModal/>
                                <NavDropdown.Item href="/sign-up">Sign Up</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                            <Nav.Link href="/my-listings">My Listings</Nav.Link>
                            <SignOutComponent/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}