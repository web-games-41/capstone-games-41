import React from "react"
import {Container, Image, Form, Col, Row, Button, Card} from "react-bootstrap";
import Avatar from "./img/avatar.jpg"
import {useDispatch} from "react-redux";
import {httpConfig} from "../utils/http-config.js";
import jwtDecode from "jwt-decode";
import {Formik} from "formik";

export const EditProfileForm = (props) => {
    const { profile } = props

    const validationObject = Yup.object().shape({
        profileName: Yup.string()
            .profileName("Enter full name")
            .required('Full name is required'),
        profileEmail: Yup.string()
            .email("Please provide a valid email")
            .required("Email is required")
    })

    function submitEditedProfile (values, { resetForm, setStatus }) {

        const submitUpdatedProfile = (updatedProfile) => {
            httpConfig.put(`/apis/profile/${profile.profileId}`, updatedProfile)
                .then(reply => {
                    let { message, type } = reply

                    if (reply.status === 200) {
                        resetForm()
                    }
                    setStatus({ message, type })
                    return (reply)
                })
        }

            if (values.profileName !== undefined) {
                httpConfig.post(`/apis/profile/`, values.profileName)
                    .then(reply => {
                        let { message, type } = reply

                        if (reply.status === 200) {
                            submitUpdatedProfile({ ...values, profileName: message })
                    } else {
                        setStatus({ message, type })
                        }
                    }
                )
            } else {
                submitUpdatedProfile(values)
            }
        }
        return (
            <Formik initialValues={profile} onSubmit={submitEditedProfile} validationSchema={validationObject}>
                {EditProfileFormContent}
            </Formik>

        )
    }

    function EditProfileContent (props) {
            setFieldValue,
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
        } = props

            return ()


export function Profile() {
    return (
        <>
            <Container>
            <h1 className="mb-5">Profile</h1>

                <Container className={"d-flex justify-content-center mt-5"}>

                    <Card style={{ width: '30rem'}}>
                        <Card.Img variant="top" src={Avatar} />
                        <Card.Body>

                    <Row>
                        <Form.Group controlId={""}>
                            <Form.Label></Form.Label>
                            <Form.Control type={"text"} required placeholder={"Profile Name"}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId={""}>
                            <Form.Label></Form.Label>
                            <Form.Control type={"text"} required placeholder={"Email"}></Form.Control>
                        </Form.Group>
                    <Col xs={12} className={"text-center"}>
                    <Form.Group>
                        <Button className={"btn btn-light btn-outline-secondary mt-5"}>Update</Button>
                    </Form.Group>
                    </Col>
                    </Row>
                        </Card.Body>
                    </Card>

                </Container>

            </Container>

        </>

    )
}





