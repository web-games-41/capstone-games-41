import React from "react";
import {Button, Col, Container, FormControl, Image, InputGroup, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {httpConfig} from "../utils/http-config.js";
import {Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Yup from "yup";



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
            .min(8,"Password must be at least eight characters"),
        profilePasswordConfirm: Yup.string()
            .required("Password Confirm is required")
            .min(8,"Password must be at least eight characters"),
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

function SignUpFormContent(props){
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
            <Form onSubmit={handleSubmit}>
                controlId must match what is passed to the initialValues prop
                <Form.Group className="mb-1" controlId="profileEmail">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon="envelope"/>
                        </InputGroup.Text>
                        <FormControl
                            className="form-control"
                            name="profileEmail"
                            type="text"
                            value={values.profileEmail}
                            placeholder="your@email.you"
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                    </InputGroup>
                    <DisplayError errors={errors} touched={touched} field={"profileEmail"} />

                </Form.Group>
                {/*controlId must match what is defined by the initialValues object*/}
                <Form.Group className="mb-1" controlId="profilePassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <FormControl
                            className="form-control"
                            name="profilePassword"
                            type="password"
                            value={values.profilePassword}
                            placeholder="P@ssword1"
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                    </InputGroup>
                    <DisplayError errors={errors} touched={touched} field={"profilePassword"} />
                </Form.Group>

                <Form.Group className="mb-1" controlId="profilePasswordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                        <FormControl
                            className="form-control"
                            name="profilePasswordConfirm"
                            type="password"
                            value={values.profilePasswordConfirm}
                            placeholder="placeholder-placeholder"
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                    </InputGroup>
                    <DisplayError errors={errors} touched={touched} field={"profilePasswordConfirm"} />
                </Form.Group>

                <Form.Group className="mb-1" controlId="profileName">
                    <Form.Label>ProfileHandle</Form.Label>
                    <InputGroup>
                        <FormControl
                            className="form-control"
                            name="profileName"
                            type="text"
                            value={values.profileName}
                            placeholder="yourHandle"
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                    </InputGroup>
                    <DisplayError errors={errors} touched={touched} field={"profileName"} />
                </Form.Group>

                <Form.Group className={"mt-3"}>
                    <Button className="btn btn-primary" type="submit">Submit</Button>
                    {" "}
                    <Button
                        className="btn btn-danger"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}
                    >Reset
                    </Button>
                </Form.Group>
            </Form>
            <DisplayStatus status={status} />









            <Form className="p-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Profile Name</Form.Label>
                <Form.Control type="text" placeholder="Enter profile name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            </Form.Group>
            <Image/>
            <Button className="d-block mx-auto" variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
    )
}