import React from "react"
import {Container, Image, Form, Col, Row, Button, Card, InputGroup, FormControl} from "react-bootstrap";
import './App.css'
import {httpConfig} from "./shared/utils/http-config.js";
import * as Yup from 'yup'
import currentUser, {fetchCurrentUser} from "../store/currentUser"
import {Formik} from "formik";
import {DisplayError} from "./shared/components/display-error/DisplayError.jsx";
import {DisplayStatus} from "./shared/components/display-status/DisplayStatus.jsx";
import {useDropzone} from "react-dropzone";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Profile = (props) => {
    const dispatch = useDispatch()
    const profile = useSelector(state => {return state.currentUser ? state.currentUser : null})

    const sideEffects = () => {
        dispatch(fetchCurrentUser())
    }

    React.useEffect(sideEffects, [dispatch])


    const validationObject = Yup.object().shape({
        profileAvatarUrl: Yup.mixed(),
        profileName: Yup.string()
            .min(1,"Enter full name")
            .required('Profile name is required'),
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

        if (values.profileAvatarUrl !== undefined) {
            httpConfig.post(`/apis/image-upload/`, values.profileAvatarUrl)
                .then(reply => {
                        let { message, type } = reply

                        if (reply.status === 200) {
                            submitUpdatedProfile({ ...values, profileAvatarUrl: message })
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
            // <h1>Profile Page</h1>
            <Formik
                initialValues={currentUser}
                onSubmit={submitEditedProfile}
                validationSchema={validationObject}
            >
                {EditProfileFormContent}
            </Formik>
            )
        }

    function EditProfileFormContent (props) {
    const {
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

            return (
                <>

            <Container>
            <h1 className="mb-5">Profile</h1>

                <Container className={"d-flex justify-content-center mt-5"}>

                    <Card style={{ width: '30rem'}}>
                        {/*<Card.Img variant="top" src={Avatar} />*/}
                        <Card.Body>

                    <Row className={"text-center"}>
                        <Form onSubmit={handleSubmit}>
                            <ImageDropZone className="dragDropBox"
                                formikProps={{
                                    values,
                                    handleChange,
                                    handleBlur,
                                    setFieldValue,
                                    fieldValue: 'profileAvatarUrl'
                                }}
                            />
                        <Form.Group controlId={"profileName"}>
                            <InputGroup>
                            <Form.Control className={"mt-3"} name="profileName" type="text" value={values.currentUser} required placeholder={"Profile Name"} onChange={handleChange} onBlur={handleBlur}/>

                            </InputGroup>
                            <DisplayError errors={errors} touched={touched} field={'profileName'}/>
                        </Form.Group>

                        <Form.Group controlId={"profileEmail"}>
                            <InputGroup>
                            <Form.Control className={"mt-3"} name="profileEmail" type="text" value={values.profileEmail} required placeholder={"Email"} onChange={handleChange} onBlur={handleBlur}/>
                            </InputGroup>
                            <DisplayError errors={errors} touched={touched} field={'profileEmail'}/>
                        </Form.Group>

                    <Form.Group>
                        <Button className={"btn btn-light btn-outline-secondary mt-5"} type="submit">Update</Button>
                        {' '}
                        <Button className="mt-5 ms-3" onClick={handleReset} disabled={!dirty || isSubmitting}>Reset</Button>

                    </Form.Group>
                        <DisplayStatus className="" status={status} />

                        </Form>
                    </Row>
                        </Card.Body>

                    </Card>

                </Container>

            </Container>

        </>

    )
}
    function ImageDropZone ({ formikProps }) {

        const onDrop = React.useCallback(acceptedFiles => {
            const formData = new FormData()
            formData.append('image', acceptedFiles[0])

            formikProps.setFieldValue(formikProps.fieldValue, formData)

        }, [formikProps])
            const { getRootProps, getInputProps,isDragActive } = useDropzone({ onDrop })

            return (
                <Form.Group {...getRootProps()}>
                    <InputGroup>
                        {
                            formikProps.values.profileAvatarUrl &&
                            <>
                                <div>
                                    <Image fluid={true} height={100} rounded={true} thumbnail={true} width={100} alt="Avatar Image" src={formikProps.values.profileAvatarUrl} />
                                </div>
                            </>
                        }
                        <div className="p-5 d-flex flex-fill bg-light justify-content-center align-items-center border rounded">
                            <FormControl aria-label="Profile Avatar file Drag & Drop area"
                            aria-describedby="Image Drag & Drop area"
                            className="form-control-file"
                            accept="image/*"
                            onChange={formikProps.handleChange}
                            onBlur={formikProps.handleBlur}
                            {...getInputProps()} />

                            {
                                isDragActive ?
                                    <span className="align-items-center">Drop image here</span>:
                                    <span className="align-items-center">Drag & Drop image here or click here to select an image</span>
                            }
                        </div>
                    </InputGroup>
                </Form.Group>

            )
        }
