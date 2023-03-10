import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import profilepic from "../images/profile.jpg"
export function Message () {
    return (
        <>
            <h1 className='text-center'>Messages</h1>
            <div>
                <Container className='rounded border-dark border-5 my-2'>
                    <Row>
                        <Col xs={3} className='d-flex justify-content-center'>
                            <Image fluid src={profilepic} width={100} height={100} alt="meow" className='rounded-circle'/>
                        </Col>
                        <Col xs={9} className='py-2'>
                            <h5>Nicole Diaz</h5>
                            <p>I want this product</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}