import {createSlice} from "@reduxjs/toolkit";
import {httpConfig} from "../ui/shared/utils/http-config.js";

const claimSlice = createSlice({
    name:"claim",
    initialState: {},
    reducers: {
        addClaims: (claim, action) => {
            claim[action.payload.listingId] = action.payload.data
        }
    }
})

export const {addClaims} = claimSlice.actions

export const fetchClaimsByListingId = (listingId) => async (dispatch) => {
    const {data} = await httpConfig.get(`/apis/listing/listingClaimed/${listingId}`);
    const payload = {listingId, data}
    dispatch(addClaims(payload));
};

export default claimSlice.reducer