import {createSlice} from "@reduxjs/toolkit";
import {httpConfig} from "../ui/shared/utils/http-config.js";

const profileSlice = createSlice({
    name:'profile',
    initialState: {},
    reducers: {
        setIndividualProfile: (profile, action) => {
            profile[action.payload.profileId] = action.payload.data
        }
    }
})

export const {setIndividualProfile} = profileSlice.actions

export const fetchProfileByProfileId = (profileId) => async (dispatch) => {
    const {data} = await httpConfig.get(`/apis/profile/${profileId}`)
    dispatch(setIndividualProfile({data, profileId}))

}

export default profileSlice.reducer