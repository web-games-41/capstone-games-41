import {createSlice} from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name:'profile',
    initialState: {},
    reducers: {
        setIndividualProfile: (profile, action) => {
            return action.payload
        }
    }
})