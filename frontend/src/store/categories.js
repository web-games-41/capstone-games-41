import {createSlice} from "@reduxjs/toolkit";
import {httpConfig} from "../ui/shared/utils/http-config.js";



const categoriesSlice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {
        setCategories: (categories, action) => {
            return action.payload
        }
    }
})

export const {setCategories} = categoriesSlice.actions

export function fetchAllCategories() {
    return async function (dispatch) {
        const {data} = await httpConfig('/apis/category')


        dispatch(setCategories(data))
    }
}

export default categoriesSlice.reducer