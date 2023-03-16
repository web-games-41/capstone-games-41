import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:'message',
    initialState: {},
    reducers: {
        setIndividualMessage: (message, action) => {
            message[action.payload.messageId] = action.payload.data
        }
    }
})