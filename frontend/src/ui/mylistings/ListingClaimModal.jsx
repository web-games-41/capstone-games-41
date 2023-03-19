import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {httpConfig} from "../shared/utils/http-config.js";
import {fetchListingsByProfileId} from "../../store/listing.js";
import {useDispatch} from "react-redux";

export const ListingClaimModal = (props) => {
    const {listing} = props
    const dispatch = useDispatch()
    const claimListing = () => {
        httpConfig.get(`/apis/listing/listingClaimed/${listing.listingId}`)
            .then(reply => {
                if (reply.status === 200) {

                    dispatch(fetchListingsByProfileId())
                    handleClose()
                }
            })
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button onClick={handleShow}> Claim</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Verification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want to claim this item?</p>
                    <Button onClick={claimListing}>Yes</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}