import React from "react";
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import listingItem from "../../images/createlistingimg1.png";
import {httpConfig} from "../shared/utils/http-config.js";
import {fetchAllListings, fetchListingsByProfileId} from "../../store/listing.js";
import {useDispatch, useSelector} from "react-redux";
import {SignInForm} from "../shared/components/main-nav/sign-in/SigninForm.jsx";
import {ListingClaimModal} from "./ListingClaimModal.jsx";


export function ListingCard(props) {

    const {listing} = props
    console.log(listing.listingClaimed)

    const trueOrFalse = () => {
        if (listing.listingClaimed === true) {
            return("true")
        } else {
            return("false")
        }
    }

    const category = useSelector(state => {
        const category = state.categories.find(category => category.categoryId === listing.listingCategoryId)
        if (category === undefined) {
            return (<></>)
        } else {
            return category
        }
    })

    console.log(category)

  /*  if (category === null) {
        return (<></>)
    }*/

    return (
        <>
            <Container className={'d-flex justify-content-center mt-5'}>

                <Card style={{width: '30rem'}}>
                    <Card.Img variant="top" src={listing.listingImageUrl}/>
                    <Card.Body>

                        <h5>Item Name:</h5><p>{listing.listingName}</p>

                        <h5>Description:</h5><p>{listing.listingDescription}</p>

                        <Row>
                            <Col>
                                <div><h5>Condition:</h5><p>{listing.listingCondition}</p>
                                </div>
                            </Col>
                            <Col>
                                <div><h5>Category:</h5><p>{category.categoryName}</p>
                                </div>
                            </Col>

                        </Row>
                        <p>Claimed: {trueOrFalse()}</p>
                        <ListingClaimModal listing={listing}/>
                        <Button className={"ms-2"}>Update</Button>


                    </Card.Body>
                </Card>

            </Container>
        </>
    )
}
