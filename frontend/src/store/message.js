import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:'message',
    initialState: {},
    reducers: {
        setIndividualMessage: (message, action) => {
            message[action.payload.profileId] = action.payload.data
        }
    }
})

export const {setIndividualMessage} = messageSlice.actions

export default messageSlice.reducer