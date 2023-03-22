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

export function Messaging () {
    const {messageProfileIdOne, messageProfileIdTwo} = useParams()


    const messages = useSelector(state => {
        if (state?.messages.constructor.name === 'Array') {
            return state.messages
        } else {
            return []
        }
    })

    const dispatch = useDispatch()

    const initialEffect = () => {
        dispatch(fetchMessagesForConvos(messageProfileIdOne, messageProfileIdTwo))
        dispatch(fetchAuth())
    }

    React.useEffect(initialEffect, [])
    return (
        <>
            {/*<MessageCards messages={messages}/>*/}
            {messages.map(message => <MessageCards message={message} key={message.messageId} /> ) }
        </>
    )
}