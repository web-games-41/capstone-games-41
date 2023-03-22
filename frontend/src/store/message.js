import {createSlice} from "@reduxjs/toolkit";
import {fetchAuth} from "./auth.js";
import {httpConfig} from "../ui/shared/utils/http-config.js";

const messageSlice = createSlice({
    name:'message',
    initialState: {},
    reducers: {
        setIndividualMessage: (message, action) => {
            message[action.payload.profileId] = action.payload.data
        },
        setInitialMessages: (messages, action) => {
            return action.payload
        }
    }
})

export const {setIndividualMessage, setInitialMessages} = messageSlice.actions

export const fetchMessagesForConvos = (profileIdOne, profileIdTwo) => async (dispatch, getState) => {
    const {data} = await httpConfig.get(`/apis/message/messagesByProfileIds/${profileIdOne}/${profileIdTwo}`)
            if (Array.isArray(data) === false) {
                throw new Error('data is malformed')
            }
            dispatch(setInitialMessages(data))


}

export default messageSlice.reducer