import profilepic from "../../../images/profile.jpg";
import profilepic2 from "../../img/avatar.jpg";
import {Col, Container, Row, Image} from "react-bootstrap";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth} from "../../../store/auth.js";


export function MessageCards (props) {
    const {message} = props
    const auth = useSelector(state => (state.auth))
    const dispatch = useDispatch()
    if (message.messageProfileId === auth.profileId) {
        return(
            <>
                <Container fluid={'md'} className='rounded border-dark mt-5'>
                    <Row>
                        <Col xs={9} className={'py-2'}>
                            <Col className='d-flex flex-row-reverse'>
                                <h5 className={"convoMssgID"}>{message.messageProfileId}</h5>
                            </Col>
                            <Col className='d-flex flex-row-reverse'>
                                <p>{message.messageContent}</p>
                            </Col>
                        </Col>
                        <Col xs={3} className='imgBox d-flex justify-content-center'>
                            <Image fluid src={profilepic} alt="meow" className='convo rounded-circle'/>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    } else {
        return(
            <>
                <Container fluid={'md'} className='rounded border-dark my-2'>
                    <Row>
                        <Col xs={3} className='d-flex justify-content-center'>
                            <Image fluid src={profilepic2} width={100} height={100} alt="meow" className='rounded-circle'/>
                        </Col>
                        <Col xs={9} className='py-2'>
                            <h5>{message.messageReceiverId}</h5>
                            <p>{message.messageContent}</p>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }

}