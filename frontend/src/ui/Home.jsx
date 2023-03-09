import React from "react"
import {Card, Col, Container, Row} from "react-bootstrap";
import BoardGame from "./img/gameIcons/boardGames.png"
import Disk from "./img/gameIcons/disks.png"
import Console from "./img/gameIcons/consoleCtlr.png"
import Cards from "./img/gameIcons/cardDeck.png"

export function Home() {
    return (
        <>
            <h1>Home</h1>
            <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>

                <Container>
                    <Row>
                        <Col><Image src={BoardGame} alt={"Board Game Icon"}/></Col>
                        <Col><Image src={Disk} alt={"Disk Game Icon"}/></Col>
                        <Col><Image src={Console} alt={"Console Game Icon"}/></Col>
                        <Col><Image src={Cards} alt={"Card Game Icon"}/></Col>
                    </Row>
                </Container>


        </>
    )
}