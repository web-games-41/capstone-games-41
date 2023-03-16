import React from "react";
import {Card, Col, Container, Row, Image} from "react-bootstrap";
import {ListingCard} from "../../mylistings/ListingCard.jsx";

export function InboxCard (props) {
    console.log(props)
    const {profile} = props
    return (
        <>
            <Container className='rounded my-2'>
                <Row>
                    <Col xs={3} className='d-flex justify-content-center'>
                        <Image fluid src={profile.profileAvatarUrl} width={100} height={100} alt="meow" className='rounded-circle'/>
                    </Col>
                    <Col xs={9} className='py-2'>
                        <h5>{profile.profileName}</h5>
                        <p>I wnt this product</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
