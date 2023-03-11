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
                <Form>
                    <Card style={{ width: '30rem'}}>
                        <Card.Img variant="top" src={listingItem} />
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Item Name</Form.Label>
                                    <Form.Control type="text" placeholder="Chess Board" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="this chess board is wack" />
                                </Form.Group>

                                <Row>
                                    <Col xs={3}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <DropdownButton variant="outline-secondary" className="mt-4 " id="dropdown-basic-button" title="Condition">
                                                <Dropdown.Item href="#/action-1">New</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Used</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Slightly used</Dropdown.Item>
                                            </DropdownButton>
                                        </Form.Group>
                                    </Col>

                                    <Col xs={3}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <DropdownButton variant="outline-secondary" className="mt-4" id="dropdown-basic-button" title="Category">
                                                <Dropdown.Item href="#/action-1">Board Games</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Disc Copy</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Console</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Cards</Dropdown.Item>
                                            </DropdownButton>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Form>
            </Container>

            <Image className="addIcon mx-auto d-block pt-5" width="" height="" src={Add} alt="Add Icon Button"/>


        </>
    )
}