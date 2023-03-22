import { createSlice } from "@reduxjs/toolkit";
import {httpConfig} from "../ui/shared/utils/http-config.js";
import {fetchAuth} from "./auth.js";

const listingSlice = createSlice({
    name: 'listing',
    initialState: {},
    reducers: {
        setInitialListings: (listings, action) => {
            return action.payload
        },
        setListing: (listings, action) => {
            listings[action.payload.listingId] = action.payload.data
        }
    }
})

export const {setInitialListings, setListing} = listingSlice.actions

/*console.log("actions", listingSlice)*/

export function fetchListingByListingId(listingId) {

    return async function (dispatch) {
        const {data} = await httpConfig(`/apis/listing/${listingId}`)


        dispatch(setListing({listingId, data}))
    }
}

export const fetchListingsByProfileId = () => async (dispatch, getState) => {
    await dispatch(fetchAuth())
    const {auth} = getState()
    if (auth !== null) {
        const {data} = await httpConfig.get(`/apis/listing/listingProfileId/${auth.profileId}`)
        if(Array.isArray(data) === false) {
            throw new Error('data is malformed')
        }

        const listingDictionary = data.reduce(
            (accumulator, currentValue) => {
                accumulator[currentValue.listingId] = currentValue
                return accumulator
            },
            {}
        )

        dispatch(setInitialListings(listingDictionary))
    }
}

export function fetchAllListings() {
    return async function (dispatch) {
        const {data} = await httpConfig('/apis/listing')
        if(Array.isArray(data) === false) {
            throw new Error('data is malformed')
        }

        const listingDictionary = data.reduce(
            (accumulator, currentValue) => {
                accumulator[currentValue.listingId] = currentValue
                return accumulator
            },
            {}
        )

        dispatch(setInitialListings(listingDictionary))
    }
}


export function fetchListingsByCategoryId(categoryId) {
    return async function (dispatch) {
        const {data} = await httpConfig('/apis/listing')
        if(Array.isArray(data) === false) {
            throw new Error('data is malformed')
        }

        const listingDictionary = data.filter(listing => listing.listingCategoryId === categoryId).reduce(
            (accumulator, currentValue) => {
                accumulator[currentValue.listingId] = currentValue
                return accumulator
            },
            {}
        )

        dispatch(setInitialListings(listingDictionary))
    }
}






export default listingSlice.reducer