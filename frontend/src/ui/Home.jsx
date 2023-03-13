import React from "react"
import "./App.css"
import {Card, Col, Container, Row, Image, Button, Form, DropdownButton, Dropdown} from "react-bootstrap";
import BoardGame from "./img/gameIcons/boardGames.png"
import Disk from "./img/gameIcons/disks.png"
import Console from "./img/gameIcons/cnslCtlr.svg"
import Cards from "./img/gameIcons/cardDeck.png"
import Add from "./img/gameIcons/addIcon.png"
import listingItem from "../images/createlistingimg1.png"

export function Home() {
    return (
        <>
            <Container className="text-center mt-5">
                <Row>
                    <Col><Image className="icons" src={BoardGame} alt={"Board Game Icon"}/></Col>
                    <Col><Image className="icons" src={Disk} alt={"Disk Game Icon"}/></Col>
                    <Col><Image className="icons" src={Console} alt={"Console Game Icon"}/></Col>
                    <Col><Image className="icons" src={Cards} alt={"Card Game Icon"}/></Col>
                </Row>
            </Container>
            <Container className={'d-flex justify-content-center mt-5'}>

                <Card style={{width: '30rem'}}>
                    <Card.Img variant="top" src={listingItem}/>
                    <Card.Body>

                        <h5>Item Name:</h5><p>Monopoly</p>

                        <h5>Description:</h5><p>Money management game</p>

                        <Row>
                            <Col>
                                <div><h5>Condition:</h5><p>New</p>
                                </div>
                            </Col>
                            <Col>
                                <div><h5>Category:</h5><p>Board Game</p>
                                </div>
                            </Col>

                        </Row>

                    </Card.Body>
                </Card>

            </Container>

            <Image className="addIcon mx-auto d-block pt-5" width="" height="" src={Add} alt="Add Icon Button"/>


        </>
    )
}