import React from "react";
import {Button, Container, DropdownButton, Image, Dropdown} from "react-bootstrap";
import image1 from "../images/createlistingimg1.png"
import image2 from "../images/createlistingimg2.png"
import image3 from "../images/createlistingimg3.png"
import Form from "react-bootstrap/Form";
export function CreateListing() {
    return (
        <>
            <Container>
                <Form className="p-4">
                    <Image className="d-block mx-auto img-thumbnail border border rounded w-50" src={image1}/>
                    <Form.Group>
                        <Button className="d-block mx-auto mt-2" variant="outline-secondary">Upload</Button>{' '}
                    </Form.Group>
                    <Form.Group className="mt-4" controlId="formBasicEmail">
                        <Form.Label>Name of Item</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name of Item" />
                    </Form.Group>
                    <DropdownButton id="dropdown-basic-button" title="Condition">
                        <Dropdown.Item href="#/action-1">New</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Used</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                    </Form>
            </Container>
        </>
    )
}