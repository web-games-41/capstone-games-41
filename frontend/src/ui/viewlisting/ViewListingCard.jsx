import {useSelector} from "react-redux";
import React from "react";

export function ViewListingCard(props) {
    const {listing} = props
    console.log(listing.listingClaimed)

    const category = useSelector(state => {
        const category = state.categories.find(category => category.categoryId === listing.listingCategoryId)
        if (category === undefined) {
            return (<></>)
        } else {
            return category
        }
    })

    console.log(category)
    return (
        <>
        </>
    )
}