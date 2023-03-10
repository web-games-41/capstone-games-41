import React from "react"
import "./App.css"
import {Card, Col, Container, Row, Image} from "react-bootstrap";
import BoardGame from "./img/gameIcons/boardGames.png"
import Disk from "./img/gameIcons/disks.png"
import Console from "./img/gameIcons/consoleCtlr.png"
import Cards from "./img/gameIcons/cardDeck.png"
import Add from "./img/gameIcons/addIcon.png"
import CastleGame from "./img/gameIcons/castleBoard.png"

export function Home() {
    return (
        <>
            <h1 className={'text-center'}>Home</h1>

            <Container className="text-center mb-5">
                <Row>
                    <Col><Image className="icons" src={BoardGame} alt={"Board Game Icon"}/></Col>
                    <Col><Image className="icons" src={Disk} alt={"Disk Game Icon"}/></Col>
                    <Col><Image className="icons" src={Console} alt={"Console Game Icon"}/></Col>
                    <Col><Image className="icons" src={Cards} alt={"Card Game Icon"}/></Col>
                </Row>
            </Container>

            <div className={"text-center bg-light mb-5"}>
                    <Image className="mainGameIcon mt-5" src={CastleGame} alt={"Castle Game Icon"}/>
                {/*LEFT ALIGN THIS TEXT*/}
                    <p>Name of Item:</p>
                    <p>Condition:</p>
                    <p>Category:</p>
            </div>

            <Image className="addIcon mx-auto d-block pt-5" src={Add} alt="Add Icon Button"/>
        </>
    )
}