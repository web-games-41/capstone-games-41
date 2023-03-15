import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import profilepic from "../../../images/profile.jpg";
import profilepic2 from "../../img/avatar.jpg"
import {useDispatch, useSelector} from "react-redux";
import {fetchListingsByProfileId} from "../../../store/listing.js";
import {ListingCard} from "../../mylistings/ListingCard.jsx";
import {InboxCard} from "../inbox/InboxCard.jsx";

export function Messaging () {
    const listings = useSelector(state => {
        if(state?.listings.constructor.name === "Object") {
            return Object.values(state.listings)
        } else []
    })

    const dispatch = useDispatch()

    const initialEffect = () => {
        dispatch(fetchListingsByProfileId())
    }

    React.useEffect(initialEffect, [])
    return (
        <>
            <Container fluid={'md'} className={'text-center'}>
            <h2>Chess Board</h2>
            </Container>

            <Container fluid={'md'} className='rounded border-dark mt-5'>
                <Row>
                    <Col xs={9} className={'py-2'}>
                    <Col className='d-flex flex-row-reverse'>
                        <h5>Nicole Diaz</h5>
                    </Col>
                    <Col className='d-flex flex-row-reverse'>
                        <p>I want this product</p>
                    </Col>
                    </Col>
                    <Col xs={3} className='d-flex justify-content-center'>
                        <Image fluid src={profilepic} width={100} height={100} alt="meow" className='rounded-circle'/>
                    </Col>
                </Row>
            </Container>

            <Container fluid={'md'} className='rounded border-dark my-2'>
                <Row>
                    <Col xs={3} className='d-flex justify-content-center'>
                        <Image fluid src={profilepic2} width={100} height={100} alt="meow" className='rounded-circle'/>
                    </Col>
                    <Col xs={9} className='py-2'>
                        <h5>Plexi Putput</h5>
                        <p>I want this product</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}