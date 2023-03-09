import React from "react"
import {Card, Col, Container, Row} from "react-bootstrap";

export function Home() {
    return (
        <>
            <Container>
            <h1 className={'text-center'}>Home</h1>
                <Container className={'d-flex justify-content-center'}>
            <Card className={'w-50'}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Container>
            </Container>
        </>
    )
}