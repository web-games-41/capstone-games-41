import React from "react"
import "../App.css"
import {Card, Col, Container, Row, Image, Button, Form, DropdownButton, Dropdown} from "react-bootstrap";
import BoardGame from "../img/gameIcons/boardGames.png"
import Disk from "../img/gameIcons/disks.png"
import Console from "../img/gameIcons/cnslCtlr.png"
import Cards from "../img/gameIcons/cardDeck.png"
import Add from "../img/gameIcons/addIcon.png"
import listingItem from "../../images/createlistingimg1.png"
import {useDispatch, useSelector} from "react-redux";
import {fetchAllListings} from "../../store/listing.js";
import {HomeCard} from "./HomeCard.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
                    <Col><Button className={"btn btn-light btn-outline-info"}><Image className="icons" src={BoardGame} alt={"Board Game Icon"}/></Button></Col>
                    <Col><Button className={"btn btn-light btn-outline-info"}><Image className="icons" src={Disk} alt={"Disk Game Icon"}/></Button></Col>
                    <Col><Button className={"btn btn-light btn-outline-info"}><Image className="icons" src={Console} alt={"Console Game Icon"}/></Button></Col>
                    <Col><Button className={"btn btn-light btn-outline-info"}><Image className="icons" src={Cards} alt={"Card Game Icon"}/></Button></Col>
                </Row>
            </Container>

            <Container>
                {listings.map(listing => <HomeCard listing={listing} key={listing.listingId} /> ) }
                <div className={"text-center"}> <Button className={"btn btn-dark btn-outline-info my-5"}>
                    <FontAwesomeIcon className={"fa-5x"} icon={"add"}/></Button></div>

            </Container>



        </>
    )
}