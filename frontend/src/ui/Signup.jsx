import React from "react";
import {Button, Container, InputGroup} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import {Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Yup from "yup";
import {DisplayError} from "./shared/components/display-error/DisplayError.jsx";
import {DisplayStatus} from "./shared/components/display-status/DisplayStatus.jsx";
import {httpConfig} from "./shared/utils/http-config.js";
import {FormDebugger} from "./shared/components/FormDebugger.jsx";


export function Signup() {
    const signUp = {
        profileEmail: "",
        profilePassword: "",
        profilePasswordConfirm: "",
        profileName: "",
    };

    const validator = Yup.object().shape({
        profileEmail: Yup.string()
            .email("email must be a valid email")
            .required("email is required"),
        profilePassword: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least eight characters"),
        profilePasswordConfirm: Yup.string()
            .required("Password Confirm is required")
            .min(8, "Password must be at least eight characters"),
        profileName: Yup.string()
            .required("profile name is required")

    });

    const submitSignUp = (values, {resetForm, setStatus}) => {
        httpConfig.post("/apis/sign-up", values)
            .then(reply => {
                    let {message, type} = reply;
                    if (reply.status === 200) {
                        resetForm();
                    }
                    setStatus({message, type});
                }
            );
    };


    return (
        <>
            <h1 className="text-center p-3">Sign Up</h1>

            <Container>
                <Formik validationSchema={validator} initialValues={signUp} onSubmit={submitSignUp}>
                    {SignUpFormContent}
                </Formik>

            </Container>

        </>
    )
}

function SignUpFormContent(props) {
    const {
        status,
        values,
        errors,
        touched,
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
    } = props;
    return (
        <>
            <Form className="p-4" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="profileName">
                    <Form.Label>Profile Name</Form.Label>
                    <Form.Control name="profileName" onBlur={handleBlur} onChange={handleChange}
                                  value={values.profileName} type="text" placeholder="Enter profile name"/>
                    <DisplayError errors={errors} touched={touched} field={"profileName"}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="profileEmail">
                    <Form.Label>Email address</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon="envelope"/>
                        </InputGroup.Text>
                        <Form.Control name="profileEmail" onBlur={handleBlur} onChange={handleChange}
                                      value={values.profileEmail} type="text" placeholder="Enter Email"/>
                    </InputGroup>
                    <DisplayError errors={errors} touched={touched} field={"profileEmail"}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="profilePassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon="key"/>
                        </InputGroup.Text>
                        <Form.Control name="profilePassword" onBlur={handleBlur} onChange={handleChange}
                                      value={values.profilePassword} type="password" placeholder="Enter Password"/>
                    </InputGroup>
                    <DisplayError errors={errors} touched={touched} field={"profilePassword"}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="profilePasswordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon="key"/>
                        </InputGroup.Text>
                        <Form.Control name="profilePasswordConfirm" onBlur={handleBlur} onChange={handleChange}
                                      value={values.profilePasswordConfirm} type="password"
                                      placeholder="Confirm Password"/>
                    </InputGroup>
                    <DisplayError errors={errors} touched={touched} field={"profilePassword"}/>
                </Form.Group>
                <Form.Group className={"mt-3 d-block mx-auto"}>
                    <Button className="btn btn-primary" type="submit">Submit</Button>
                    {" "}
                    <Button
                        className="btn btn-danger"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}
                    >Reset
                    </Button>
                </Form.Group>
                <DisplayStatus status={status}/>
            </Form>
            {/*<FormDebugger {...props}/>*/}
        </>
    )
}