import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import listingItem from "../../images/createlistingimg1.png";


export function ListingCard(props) {

    const {listing} = props
    return (
        <>
            <Container className={'d-flex justify-content-center mt-5'}>

                <Card style={{width: '30rem'}}>
                    <Card.Img variant="top" src={listingItem}/>
                    <Card.Body>

                        <h5>Item Name:</h5><p>{listing.listingName}</p>

                        <h5>Description:</h5><p>{listing.listingDescription}</p>

                        <Row>
                            <Col>
                                <div><h5>Condition:</h5><p>{listing.listingCondition}</p>
                                </div>
                            </Col>
                            <Col>
                                <div><h5>Category:</h5><p>{listing.listingCategoryId}</p>
                                </div>
                            </Col>

                        </Row>

                    </Card.Body>
                </Card>

            </Container>
        </>
    )
}
