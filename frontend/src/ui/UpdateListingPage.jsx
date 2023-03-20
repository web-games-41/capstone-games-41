import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {UpdateListing} from "./UpdateListing.jsx";

export function UpdateListingPage () {
    let {listingId} = useParams()
    console.log(listingId)
    /*const auth = useSelector(state =>(state.auth))*/
    const listing = useSelector(state => {
        if(state?.listings.constructor.name === "Object") {
            return state.listings[listingId]
        } else return null
    })
    return (
        <>
            {listing &&
            <UpdateListing listing = {listing}/>
            }

        </>
    )
}