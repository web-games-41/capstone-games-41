/*
import React from "react";
import {Button, Card, Col, Container, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";
import listingitem from "../../images/createlistingimg1.png"
import {ListingCard} from "./ListingCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllListings} from "../../store/listing.js";

export function MyListings() {
    const listings = useSelector(state => {
        console.log(state.listings)
        if(state?.listings.constructor.name === "Object") {
            return Object.values(state.listings)
        } else []
    })

    const dispatch = useDispatch()

    const initialEffect = () => {
        dispatch(fetchAllListings())
    }

    React.useEffect(initialEffect, [])

    console.log("listing slice", listings)
    return (
        <>
            <Container>
            <h3 className={'px-5 my-3'}>My Listings</h3>
            </Container>

            <Container className={'d-flex justify-content-center my-3'}>

            <Card style={{ width: '30rem'}}>
                <Card.Img variant="top" src={listingitem} />
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
                            <Col xs={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <DropdownButton variant="outline-secondary" className="mt-4 " id="dropdown-basic-button" title="Condition">
                                <Dropdown.Item href="#/action-1">New</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Used</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Slightly used</Dropdown.Item>
                            </DropdownButton>
                        </Form.Group>
                            </Col>

                            <Col xs={4}>
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

                        <Button variant="primary" type="submit" className={'d-block mx-auto mt-4'}>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            </Container>
        </>
    )
}*/
