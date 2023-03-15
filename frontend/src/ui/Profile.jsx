import React from "react"
import {Container, Image, Form, Col, Row, Button, Card, InputGroup, FormControl} from "react-bootstrap";
import Avatar from "./img/avatar.jpg"
import {httpConfig} from "./shared/utils/http-config.js";
import * as Yup from 'yup'
import {Formik} from "formik";
import {DisplayError} from "./shared/components/display-error/DisplayError.jsx";
import {DisplayStatus} from "./shared/components/display-status/DisplayStatus.jsx";
import {useDropzone} from "react-dropzone";

export const EditProfileForm = (props) => {
    const { profile } = props

    const validationObject = Yup.object().shape({
        profileAvatarUrl: Yup.mixed(),
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

        if (values.profileAvatarUrl !== undefined) {
            httpConfig.post(`/apis/profile/`, values.profileAvatarUrl)
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
            <Formik
                initialValues={profile}
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
                        <Card.Img variant="top" src={Avatar} />
                        <Card.Body>

                    <Row>
                        <Form onSubmit={handleSubmit}>
                        <Form.Group controlId={"profileName"}>
                            {/*<Form.Label>DO WE REALLY NEED A FORM LABEL?</Form.Label>*/}
                            <InputGroup>
                            <Form.Control name="profileName" type="text" value={values.profileName} required placeholder={"Profile Name"} onChange={handleChange} onBlur={handleBlur}/>
                            </InputGroup>
                            <DisplayError errors={errors} touched={touched} field={'profileName'}/>
                        </Form.Group>

                        <Form.Group controlId={"profileEmail"}>
                            {/*<Form.Label>DO WE REALLY NEED A FORM LABEL?</Form.Label>*/}
                            <InputGroup>
                            <Form.Control name="profileEmail" type="text" value={values.profileEmail} required placeholder={"Email"} onChange={handleChange} onBlur={handleBlur}/>
                            </InputGroup>
                            <DisplayError errors={errors} touched={touched} field={'profileEmail'}/>
                        </Form.Group>

                            <ImageDropZone
                                formikProps={{
                                    values,
                                    handleChange,
                                    handleBlur,
                                    setFieldValue,
                                    fieldValue: 'profileAvatarUrl'
                                }}
                            />

                    <Col xs={12} className={"text-center"}>
                    <Form.Group>
                        <Button className={"btn btn-light btn-outline-secondary mt-5"} type="submit">Update</Button>
                        {' '}
                        <Button className="btn btn-danger" onClick={handleReset} disabled={!dirty || isSubmitting}>Reset</Button>
                    </Form.Group>
                        <DisplayStatus status={status} />
                    </Col>
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
                    {/*<Form.Label>USE OR NOT USE THIS LABEL IS THE QUESTION?!?</Form.Label>*/}
                    <InputGroup>
                        {
                            formikProps.values.profileAvatarUrl &&
                            <>
                                <div>
                                    <Image fluid={true} height={100} rounded={true} thumbnail={true} width={100} alt="Avatar Image" src={formikProps.values.profileAvatarUrl} />
                                </div>
                            </>
                        }
                        <div className="d-flex flex-fill bg-light justify-content-center align-items-center border rounded">
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
