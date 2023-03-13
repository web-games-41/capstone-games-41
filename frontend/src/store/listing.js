import { createSlice } from "@reduxjs/toolkit";

const listingSlice = createSlice({
    name: 'listing',
    initialState: {},
    reducers: {
        setInitialListings: (listings, action) => {
            return action.payload
        }
    }
})

/*export const {setInitialListings, removeListing} = listingSlice.actions

console.log("actions", listingSlice)*/

export default listingSlice.reducer