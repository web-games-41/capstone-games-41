import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import listingItem from "../../images/createlistingimg1.png";
import {useSelector} from "react-redux";
import {ViewListing} from "../viewlisting/ViewListing.jsx";
import {Link, useNavigate} from "react-router-dom";

export function HomeCard(props) {

    const {listing} = props
    const navigate = useNavigate()

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
            <Link to={`/view-listing/${listing.listingId}`}>
            <Container className={'d-flex justify-content-center mt-5'}>

                <Card style={{width: '30rem'}}>
                    <Card.Img variant="top" src={listing.listingImageUrl}/>
                    <Card.Body>

                        <h5>Item Name:</h5><p>{listing.listingName}</p>

                       {/* <h5>Description:</h5><p>{listing.listingDescription}</p>*/}

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

                    </Card.Body>
                </Card>

            </Container>
            </Link>
        </>
    )
}