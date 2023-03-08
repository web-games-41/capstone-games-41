import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
export function Message () {
    return (
        <>
            <h1 className='text-center'>Messages</h1>
            <div>
                <Container className='bg-secondary'>
                    <Row>
                        <Col xs={9} className='py-2'>
                            <p>
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis</p>
                        </Col>
                            <Col xs={3} className='d-flex justify-content-end px-0'>
                                <Image fluid src="https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder-1024x1024.png" width={100} height={100} alt="meow" className='rounded-circle'/>
                            </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}