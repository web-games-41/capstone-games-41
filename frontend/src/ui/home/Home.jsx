import React from "react"
import "../App.css"
import {Card, Col, Container, Row, Image, Button, Form, DropdownButton, Dropdown} from "react-bootstrap";
/*import Board from "/frontend/src/ui/img/gameIcons/boardGames.png"
import BoardGamesHvr from "../img/gameIcons/boardGamesHvr.png"
import Disc from "../img/gameIcons/disks.png"
import Console from "../img/gameIcons/cnslCtlr.png"
import Cards from "../img/gameIcons/cardDeck.png"*/
import {useDispatch, useSelector} from "react-redux";
import {fetchAllListings, fetchListingsByCategoryId} from "../../store/listing.js";
import {HomeCard} from "./HomeCard.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchAllCategories} from "../../store/categories.js";

export function Home() {
    const listings = useSelector(state => {
        if(state?.listings.constructor.name === "Object") {
            return Object.values(state.listings)
        } else []
    })

    const categories = useSelector(state => state.categories ? state.categories : [])

    const dispatch = useDispatch()

    const initialEffect = () => {
        dispatch(fetchAllListings())
        dispatch(fetchAllCategories())
    }

    React.useEffect(initialEffect, [])

    const CategoryIcon = ({category}) => {
        const filterCategories = () => {
            dispatch(fetchListingsByCategoryId(category.categoryId))
        }
        return (<Col><Image className="icons" src={`/public/${category.categoryName}.png`} onClick={filterCategories} alt={category.categoryName}/></Col>)
    }







    return (
        <>
            <Container className="text-center mt-5">
                <Row>

                    {categories.map(category => <CategoryIcon category={category} key={category.categoryId}/>)}
                    <Col><Image className="icons" src={`/public/refresh.png`} onClick={initialEffect} alt={"board"}/></Col>


                </Row>
            </Container>

            <Container>
                {listings.filter(unfilteredListing => unfilteredListing.listingClaimed === false).map(listing => <HomeCard listing={listing} key={listing.listingId} /> ) }

                <div className={"text-center"}>
                    <Button href={"/create-listing"} className={"btn btn-dark btn-outline-light my-5"}>
                        <FontAwesomeIcon className={"fa-5x"} icon={"add"}/>
                    </Button>
                </div>

            </Container>



        </>
    )
}