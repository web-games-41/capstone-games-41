import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UpdateListing} from "./UpdateListing.jsx";
import {fetchAllCategories} from "../store/categories.js";
import {fetchAuth} from "../store/auth.js";
import React from "react";
import {fetchListingByListingId} from "../store/listing.js";

export function UpdateListingPage () {
    let {listingId} = useParams()
    console.log(listingId)
    /*const auth = useSelector(state =>(state.auth))*/
    const listing = useSelector(state => {
        if(state?.listings.constructor.name === "Object") {
            return state.listings[listingId]
        } else return null
    })
    const dispatch = useDispatch()
    const initialEffects = () => {

        dispatch(fetchListingByListingId(listingId))
    }
    React.useEffect(initialEffects, [dispatch])
    return (
        <>
            {listing &&
            <UpdateListing listing = {listing}/>
            }

        </>
    )
}