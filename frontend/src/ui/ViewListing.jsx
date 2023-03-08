import React from "react";
import {Button, Carousel, Col, Container, Form, Image, Row} from "react-bootstrap";
import image1 from "../images/ui.png"
import image2 from "../images/pic1.png"
import image3 from "../images/pic2.png"
import profilepic from "../images/profile.jpg"

export function ViewListing () {
    return(
        <>
            <Container>
            <Carousel>
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src={image1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image2}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image3}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>

            <Container>
                <Row className='g-2'>
                    <Col xs={12}>
                        <h1>Chess Board</h1>
                    </Col>
                    <Col xs={6}>
                        <h2>Condition</h2>
                        <p>Used</p>
                    </Col>
                    <Col xs={6}>
                        <h2>Category</h2>
                        <p>Board Games</p>
                    </Col>
                    <Col xs={12}>
                        <h3>Description</h3>
                        <p>Antique Chess Board straight from the pope's palace</p>
                    </Col>
                </Row>
            </Container>
                <Row className='rounded'>
                        <Col xs={2} className='px-0'>
                            <Image fluid src={profilepic} alt="meow" className='rounded-circle'/>
                        </Col>
                        <Col xs={10} className='py-2'>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <h3>Nicole Diaz</h3>
                                    <Form.Control type="email" placeholder="Send a Message to the Donor" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Send
                                </Button>
                            </Form>
                        </Col>
                    </Row>
            </Container>
        </>
    )
}