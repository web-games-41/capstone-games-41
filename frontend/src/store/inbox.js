import { createSlice } from "@reduxjs/toolkit";
import {httpConfig} from "../ui/shared/utils/http-config.js";
import {fetchAuth} from "./auth.js";

const inboxSlice = createSlice({
    name: 'inbox',
    initialState: {},
    reducers: {
        setInitialInbox: (profiles, action) => {
            return action.payload
        }
    }
})

export const {setInitialInbox, removeListing} = inboxSlice.actions

export const fetchProfilesForInbox = () => async (dispatch, getState) => {
    await dispatch(fetchAuth())
    const {auth} = getState()
    if (auth !== null) {
        const {data} = await httpConfig.get(`/apis/profile/inbox/messages`)
        console.log(data)
        if(Array.isArray(data) === false) {
            throw new Error('data is malformed')
        }

        const listingDictionary = data.reduce(
            (accumulator, currentValue) => {
                accumulator[currentValue.profileId] = currentValue
                return accumulator
            },
            {}
        )

        dispatch(setInitialInbox(listingDictionary))
    }
}

export default inboxSlice.reducer