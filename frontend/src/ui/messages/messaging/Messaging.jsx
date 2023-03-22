import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import profilepic from "../../../images/profile.jpg";
import profilepic2 from "../../img/avatar.jpg"
import {useDispatch, useSelector} from "react-redux";
import {fetchListingsByProfileId} from "../../../store/listing.js";
import {ListingCard} from "../../mylistings/ListingCard.jsx";
import {InboxCard} from "../inbox/InboxCard.jsx";
import {MessageCards} from "./MessageCards";
import {useParams} from "react-router-dom";
import message, {fetchMessagesForConvos} from "../../../store/message.js";
import {fetchAuth} from "../../../store/auth.js";
import {SendMessageForm} from "./SendMessageForm.jsx";

export function Messaging () {
    const {messageProfileIdOne, messageProfileIdTwo} = useParams()


    const messages = useSelector(state => {
        if (state?.messages.constructor.name === 'Array') {
            return state.messages
        } else {
            return []
        }
    })
console.log(messages)


    const lastMessage = messages.at(-1)
    console.log(lastMessage)
    const dispatch = useDispatch()


    const initialEffect = () => {
        dispatch(fetchMessagesForConvos(messageProfileIdOne, messageProfileIdTwo))
        dispatch(fetchAuth())
    }

    React.useEffect(initialEffect, [])
    if (messages.length === 0 ) {
        return (<></>)
    }


    return (
        <>
            <Container>
            {/*<MessageCards messages={messages}/>*/}
            {messages.map(message => <MessageCards message={message} key={message.messageId} /> ) }
                <SendMessageForm messageListingId={lastMessage.messageListingId}/>
            </Container>
        </>
    )
}