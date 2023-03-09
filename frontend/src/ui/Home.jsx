import React from "react"
import "./App.css"
import {Card, Col, Container, Row, Image} from "react-bootstrap";
import BoardGame from "./img/gameIcons/boardGames.png"
import Disk from "./img/gameIcons/disks.png"
import Console from "./img/gameIcons/consoleCtlr.png"
import Cards from "./img/gameIcons/cardDeck.png"

export function Home() {
    return (
        <>
            <h1 className={'text-center'}>Home</h1>

            <Container className="text-center">
                <Row>
                    <Col><Image className="icons" src={BoardGame} alt={"Board Game Icon"}/></Col>
                    <Col><Image className="icons" src={Disk} alt={"Disk Game Icon"}/></Col>
                    <Col><Image className="icons" src={Console} alt={"Console Game Icon"}/></Col>
                    <Col><Image className="icons" src={Cards} alt={"Card Game Icon"}/></Col>
                </Row>
            </Container>

        </>
    )
}