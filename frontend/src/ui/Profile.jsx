import React from "react"
import {Container, Image, Form, Col, Row, Button, Card} from "react-bootstrap";
import Avatar from "./img/avatar.jpg"



export function Profile() {
    return (
        <>
            <Container>
            <h1 className="mb-5">Profile</h1>
                {/*<div className="ms-5 ps-4 ms-md-0 ps-md-0">*/}
                {/*<Image fluid className="rounded mb-5 mx-md-auto d-block" src={Avatar} alt="Generic Avatar"/>*/}
                {/*</div>*/}

                <Container className={"d-flex justify-content-center mt-5"}>
                <Form>
                    <Card style={{ width: '30rem'}}>
                        <Card.Img variant="top" src={Avatar} />
                        <Card.Body>

                    <Row>
                    <Col xs={6}>
                        <Form.Group controlId={""}>
                            <Form.Label></Form.Label>
                            <Form.Control type={"text"} required placeholder={"First Name"}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group controlId={""}>
                            <Form.Label></Form.Label>
                            <Form.Control type={"text"} required placeholder={"Last Name"}></Form.Control>
                        </Form.Group>
                    </Col>
                        <Form.Group controlId={""}>
                            <Form.Label></Form.Label>
                            <Form.Control type={"text"} required placeholder={"Email"}></Form.Control>
                        </Form.Group>
                    <Col xs={12} className={"text-center"}>
                    <Form.Group>
                        <Button className={"btn btn-light btn-outline-secondary mt-5"}>Update</Button>
                    </Form.Group>
                    </Col>
                    </Row>
                        </Card.Body>
                    </Card>
                </Form>
                </Container>

            </Container>

        </>

    )
}





