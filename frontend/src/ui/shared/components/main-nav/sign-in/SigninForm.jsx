import React from 'react';
import {httpConfig} from "../../../utils/http-config.js";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import jwtDecode from "jwt-decode";

export const SignInForm = () => {

    const dispatch = useDispatch()

    const validator = Yup.object().shape({
        profileEmail: Yup.string()
            .email("please provide a valid email")
            .required('email is required'),
        profilePassword: Yup.string()
            .required("password is required")
            .min(8, "password must be at least eight characters")
    });

    //the initial values object defines what the request payload is.
    const signIn = {
        profileEmail: "",
        profilePassword: ""
    };

    const sumbitSignIn = (values, {resetForm, setStatus}) => {
    httpConfig.post("/apis/sign-in/", values)
        .then(reply => {
            let {message, type} = reply;
            setStatus({message, type});
            if(reply.status === 200 && reply.headers["authorization"]) {
                window.localStorage.removeItem("authorization");
                window.localStorage.setItem("authorization", reply.headers["authorization"]);
                resetForm();
                let jwtToken = jwtDecode(reply.headers["authorization"])
                dispatch(getAuth(jwtToken))
            }
            setStatus({message, type});
        });
    };

    return (
        <>
            <Formik initialValues={signIn}
                    onSubmit={submitSignIn}
                    validationSchema={validator}
                    >
                {SignInFormContent}
            </Formik>
        </>
    )
};