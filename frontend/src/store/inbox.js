import { createSlice } from "@reduxjs/toolkit";
import {httpConfig} from "../ui/shared/utils/http-config.js";
import {fetchAuth} from "./auth.js";
import {setIndividualMessage} from "./message.js";

const inboxSlice = createSlice({
    name: 'inbox',
    initialState: {},
    reducers: {
        setInbox: (profiles, action) => {
            return action.payload
        }
    }
})

export const {setInbox, removeListing} = inboxSlice.actions

export const fetchProfilesForInbox = () => async (dispatch, getState) => {
    await dispatch(fetchAuth())
    const {auth} = getState()
    if (auth !== null) {
        const {data} = await httpConfig.get(`/apis/profile/inbox/messages`)
        if(Array.isArray(data) === false) {
            throw new Error('data is malformed')
        }


        for (let profile of data) {
            console.log(profile.profileId)
            const {data: messages} = await httpConfig.get(`/apis/message/messagesByProfileIds/${auth.profileId}/${profile.profileId}`)
            const message = messages.at(-1)
            dispatch(setIndividualMessage({profileId: profile.profileId, data:message}))
        }
            const listingDictionary = data.reduce(
            (accumulator, currentValue) => {
                accumulator[currentValue.profileId] = currentValue
                return accumulator
            },
            {}
        )

        dispatch(setInbox(listingDictionary))
    }
}

export default inboxSlice.reducer