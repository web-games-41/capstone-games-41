import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import profilepic from "../../../images/profile.jpg"
import {ListingCard} from "../../mylistings/ListingCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchProfilesForInbox} from "../../../store/inbox.js";
import {InboxCard} from "./InboxCard";
export function Message () {
    const profiles = useSelector(state => {
        if(state?.inbox.constructor.name === "Object") {
            return Object.values(state.inbox)
        } else []
    })

    const dispatch = useDispatch()

    const initialEffect = () => {
        dispatch(fetchProfilesForInbox())
    }

    React.useEffect(initialEffect, [])
    return (
        <>
            <h1 className='text-center'>Messages</h1>
            <div>
               {/* <a href='/convo'>*/}
                {/*<Container className='rounded my-2'>
                    <Row>
                        <Col xs={3} className='d-flex justify-content-center'>
                            <Image fluid src={profilepic} width={100} height={100} alt="meow" className='rounded-circle'/>
                        </Col>
                        <Col xs={9} className='py-2'>
                            <h5>Nicole Diaz</h5>
                            <p>I want this product</p>
                        </Col>
                    </Row>
                </Container>*/}

                    <Container>
                        {profiles.map(profile => <InboxCard profile={profile} key={profile.profileId} /> ) }
                    </Container>
               {/* </a>*/}
            </div>
        </>
    )
}