import {useDispatch, useSelector} from "react-redux";
import {fetchCurrentUser} from "../store/currentUser.js";
import React from "react";
import {Profile} from "./Profile.jsx";

export function ProfilePage() {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => {return state.currentUser ? state.currentUser : null})

    const sideEffects = () => {
        dispatch(fetchCurrentUser())
    }

    React.useEffect(sideEffects, [dispatch])

    return (
        <>

            {currentUser && <Profile currentUser={currentUser}/>}

        </>
    )
}