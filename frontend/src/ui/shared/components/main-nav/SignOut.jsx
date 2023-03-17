import React from 'react'
import {useDispatch} from "react-redux";
import {httpConfig} from "../../utils/http-config.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getAuth} from "../../../../store/auth.js";
import {Nav, NavDropdown} from "react-bootstrap";

export const SignOutComponent = () => {
    const dispatch = useDispatch()
    const signOut = () => {
        httpConfig.get('/apis/sign-out/').then(reply => {

            if (reply.status === 200) {
                window.localStorage.removeItem('authorization')
                dispatch(getAuth(null))
                window.location = '/'
            }
        })
    }

    return(
        <>
            <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
        </>
    )
}