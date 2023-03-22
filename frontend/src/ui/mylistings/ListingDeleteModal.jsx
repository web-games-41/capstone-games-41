import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {httpConfig} from "../shared/utils/http-config.js";
import {fetchListingsByProfileId, setListing} from "../../store/listing.js";
import {Button, Modal} from "react-bootstrap";


export const ListingDeleteModal = (props) => {
    const {listing} = props
    const dispatch = useDispatch()
    const deleteListing = () => {
        httpConfig.delete(`/apis/listing/${listing.listingId}`)
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
            <Button className={"ms-5 btn btn-danger"} onClick={handleShow}> Delete </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Verification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this listing?</p>
                    <Button onClick={deleteListing}>Yes</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}