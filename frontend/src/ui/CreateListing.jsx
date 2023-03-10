import React from "react";
import {Button, Container, DropdownButton, Image, Dropdown, Col, Row} from "react-bootstrap";
import image1 from "../images/createlistingimg1.png"
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
                    <Form.Group className="mt-4" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" />
                    </Form.Group>
                    <Row>
                        <Col sm={2}>
                            <DropdownButton variant="outline-secondary" className="mt-4 " id="dropdown-basic-button" title="Condition">
                                <Dropdown.Item href="#/action-1">New</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Used</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Slightly used</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col>
                            <DropdownButton variant="outline-secondary" className="mt-4" id="dropdown-basic-button" title="Category">
                                <Dropdown.Item href="#/action-1">Board Games</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Disc Copy</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Console</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Cards</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Row>

                    <Button className="d-block mx-auto mt-5" variant="outline-secondary" type="submit">
                        Create Listing
                    </Button>


                    </Form>
            </Container>
        </>
    )
}