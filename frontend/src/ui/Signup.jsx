import React from "react";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';


export function Signup() {
    return (
        <>
            <h1 className="text-center p-3">Sign Up</h1>

            <Container>

            <Form className="p-4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                </Form.Group>
                <Image/>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </Container>

        </>
    )
}