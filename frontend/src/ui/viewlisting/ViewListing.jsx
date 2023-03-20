import React from "react";
import {Button, Card, Carousel, Col, Container, Form, Image, Row} from "react-bootstrap";
import image1 from "../../images/ui.png"
import image2 from "../../images/pic1.png"
import image3 from "../../images/pic2.png"
import profilepic from "../../images/profile.jpg"
import {useDispatch, useSelector} from "react-redux";
import {fetchListingByListingId, fetchListingsByProfileId} from "../../store/listing.js";
import {fetchAllCategories} from "../../store/categories.js";
import {ViewListingCard} from "./ViewListingCard";
import {ListingCard} from "../mylistings/ListingCard.jsx";
import {useParams} from "react-router-dom";

export function ViewListing () {
    const {listingId} = useParams()
        const listing = useSelector(state => (state?.listings.constructor.name === "Object") ? state.listings[listingId] : null )


        const dispatch = useDispatch()

        const initialEffect = () => {
            dispatch(fetchListingByListingId(listingId))
            dispatch(fetchAllCategories())
        }

        React.useEffect(initialEffect, [])

    console.log(listing)

    const category = useSelector(state => {
        const category = state.categories.find(category => category.categoryId === listing.listingCategoryId)
        if (category === undefined) {
            return (<></>)
        } else {
            return category
        }
    })

        return (
            <>

                <Container className={'d-flex justify-content-center my-3'}>

                    <Card style={{width: '50rem'}}>
                        <Card.Img variant="top" src={listing.listingImageUrl}/>
                        <Card.Body>

                            <h5>Item Name:</h5><p>{listing.listingName}</p>

                            <h5>Description:</h5><p>{listing.listingDescription}</p>

                            <Row>
                                <Col xs={6}>
                                    <div><h5>Condition:</h5><p>{listing.listingCondition}</p>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div><h5>Category:</h5><p>{category.categoryName}</p>
                                    </div>
                                </Col>
                                <Col xs={3} className='px-0 my-3'>
                                    <Image fluid src={profilepic} alt="meow" className='rounded-circle'/>
                                </Col>
                                <Col xs={9} className='py-2 my-3'>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <h3>Nicole Diaz</h3>
                                            <Form.Control type="text" placeholder="Is this Item Available"/>
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Send
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        )
}