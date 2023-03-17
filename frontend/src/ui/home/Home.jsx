import React from "react"
import "../App.css"
import {Card, Col, Container, Row, Image, Button, Form, DropdownButton, Dropdown} from "react-bootstrap";
import BoardGame from "../img/gameIcons/boardGames.png"
import Disk from "../img/gameIcons/disks.png"
import Console from "../img/gameIcons/cnslCtlr.svg"
import Cards from "../img/gameIcons/cardDeck.png"
import Add from "../img/gameIcons/addIcon.png"
import listingItem from "../../images/createlistingimg1.png"
import {useDispatch, useSelector} from "react-redux";
import {fetchAllListings} from "../../store/listing.js";
import {HomeCard} from "./HomeCard.jsx";

export function Home() {
    const listings = useSelector(state => {
        if(state?.listings.constructor.name === "Object") {
            return Object.values(state.listings)
        } else []
    })

    const dispatch = useDispatch()

    const initialEffect = () => {
        dispatch(fetchAllListings())
    }

    React.useEffect(initialEffect, [])

    return (
        <>
            <Container className="text-center mt-5">
                <Row>
                    <Col><Image className="icons" src={BoardGame} alt={"Board Game Icon"}/></Col>
                    <Col><Image className="icons" src={Disk} alt={"Disk Game Icon"}/></Col>
                    <Col><Image className="icons" src={Console} alt={"Console Game Icon"}/></Col>
                    <Col><i className="fa fa-check-circle-o fa-5x text-success"></i></Col>
                    <Col><Image className="icons" src={Cards} alt={"Card Game Icon"}/></Col>
                </Row>
            </Container>

            <Container>
                {listings.map(listing => <HomeCard listing={listing} key={listing.listingId} /> ) }
            </Container>

            <Image className="addIcon mx-auto d-block pt-5" width="" height="" src={Add} alt="Add Icon Button"/>


        </>
    )
}