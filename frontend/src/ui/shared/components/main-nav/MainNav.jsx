import {Button, Container, Form, Image, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import "../../../App.css"
import messageIcon from "../../../img/messageIcon.png"
import Logo from "../../../img/tossMeAGameLogo.png"
import {SignInModal} from "./sign-in/SigninModal";
import {SignOutComponent} from "./SignOut";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth} from "../../../../store/auth.js";
import {Link} from "react-router-dom";

export function Navigation () {
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch()
    const effects = () => {
        dispatch(fetchAuth());
    };
    useEffect(effects, [dispatch]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isModalOpen = () => {
        if(!auth) {
            return !auth
        } else if (show === true && auth ) {
            return true
        }
    }


    return (
        <>
            <Navbar className={"sticky-top pb-5"} expand="lg">
                <Container>
                    <a href="/" className={'fs-4'}>
                        <Image className={"rounded"} fluid width={"50px"} src={Logo} alt={"Toss Me A Game Logo"} /> Toss Me A Game</a>

                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end p-2">
                        {auth !== null && (
                        <Nav>
                            <a href='/message'>
                                <Image fluid className={"d-xs-flex"} width={"30px"} src={messageIcon} alt={"Message Icon"} /> </a>
                        </Nav>
                        )}
                        <Nav>
                            {auth === null && (
                            <NavDropdown title="Sign In/Sign Up" id="basic-nav-dropdown">
                                <SignInModal/>
                                <NavDropdown.Item href="/sign-up">Sign Up</NavDropdown.Item>
                            </NavDropdown>
                            )}
                            {auth !== null && (
                                <>
                            <Link to="/profile">Profile </Link>
                            <Nav.Link href="/my-listings">My Listings</Nav.Link>
                            <SignOutComponent/>
                                </>
                                )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}