import React from "react";
import {Card, Col, Container, Row, Image} from "react-bootstrap";
import {ListingCard} from "../../mylistings/ListingCard.jsx";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

export function InboxCard (props) {
    const {profile} = props

    const message = useSelector(state => {
        if (state.messages[profile.profileId] === undefined ) {
            return null
        } else {
            return state.messages[profile.profileId]
        }
    })
    console.log(message)
    if (message === null) {
        return <>loading</>
    }

    return (
        <>

            <Link to={`/convo/${message.messageProfileId}/${message.messageReceiverId}`}>
            <Container className='inboxImg-Txt rounded my-3'>
                <Row>
                    <Col xs={3} className='d-flex justify-content-center'>
                        <Image fluid src={profile.profileAvatarUrl} width={100} height={100} alt="meow" className='rounded-circle'/>
                    </Col>
                    <Col xs={9} className='py-2'>

                        <h5 className={'mssgProfileName'}>{profile.profileName}</h5>
                        <p>{message.messageContent}</p>
                    </Col>
                </Row>
            </Container>
            </Link>
        </>
    )
}
