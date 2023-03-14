import React from "react";
import {Modal} from "react-bootstrap";

export const SignInModal = (props) => {
    const {handleShow, handleClose, show} = props
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignInForm/>
                </Modal.Body>
            </Modal>
        </>
    )
}