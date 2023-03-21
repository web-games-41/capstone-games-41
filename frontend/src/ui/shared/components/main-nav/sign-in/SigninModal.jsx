import React, {useState} from "react";
import {Button, Modal, NavDropdown} from "react-bootstrap";
import {SignInForm} from "./SigninForm.jsx";

export const SignInModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <NavDropdown.Item variant="primary" onClick={handleShow}>
                Sign In
            </NavDropdown.Item>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body className={"rounded-bottom"}>
                    <SignInForm/>
                </Modal.Body>
            </Modal>
        </>
    )
}