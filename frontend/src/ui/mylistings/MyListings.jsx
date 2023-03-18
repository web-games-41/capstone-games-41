import React from "react";
import {Button, Card, Col, Container, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";
import {ListingCard} from "./ListingCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllListings, fetchListingsByProfileId} from "../../store/listing.js";


export function MyListings() {
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
            <Container>
            <h3 className={'px-5 my-3'}>My Listings</h3>
            </Container>

            <Container>
                {listings.map(listing => <ListingCard listing={listing} key={listing.listingId} /> ) }
            </Container>
        </>
    )
}
