import {useDispatch, useSelector} from "react-redux";
import {fetchAllCategories} from "../store/categories.js";
import {fetchAuth} from "../store/auth.js";
import React, {useState} from "react";
import * as Yup from "yup";
import {httpConfig} from "./shared/utils/http-config.js";
import {Button, Col, Container, FormControl, Image, InputGroup, Row} from "react-bootstrap";
import {Formik} from "formik";
import Form from "react-bootstrap/Form";
import {DisplayError} from "./shared/components/display-error/DisplayError.jsx";
import {FormDebugger} from "./shared/components/FormDebugger.jsx";
import {DisplayStatus} from "./shared/components/display-status/DisplayStatus.jsx";
import {useDropzone} from "react-dropzone";
import {useParams} from "react-router-dom";



export function UpdateListing({listing}) {
    const auth = useSelector(state =>(state.auth))
    const listingId = listing.listingId
    const initialValues = {...listing, imageUrl:null}
    const categories = useSelector(state => (state.categories))

    const dispatch = useDispatch()
    const initialEffects = () => {
        dispatch(fetchAllCategories())
        dispatch(fetchAuth())
        /*dispatch(fetchListingByListingId(listingId))*/
    }
    React.useEffect(initialEffects, [dispatch])

    const validator = Yup.object().shape({

        listingCategoryId: Yup.string(),

        listingClaimed: Yup.boolean(),

        listingCondition: Yup.string(),

        listingDescription: Yup.string()
            .required("Description content is required"),
        imageUrl: Yup.mixed()
            .required("Image required"),
        listingName: Yup.string()
            .required("Listing Name is required"),


    });

    const onSubmit = (values, {resetForm, setStatus}) => {
        console.log(auth)
        //use values to create a listing. for listing profileId use profileId in auth
        if (values.imageUrl === null) {
            updateListing(values)
        } else {
            httpConfig.post("/apis/image-upload", values.imageUrl).then(reply =>{
                    let {message, type} = reply;
                    if (reply.status === 200){
                        updateListing(message)
                    } else {
                        setStatus({message, type});
                    }
                }

            )
        }
        function updateListing(listingImageUrl){
            const listing = {listingId, listingCategoryId: values.listingCategoryId, listingCondition: values.listingCondition, listingDescription: values.listingDescription, listingDate: values.listingDate, listingImageUrl: listingImageUrl, listingName: values.listingName, listingProfileId: auth.profileId, listingClaimed: false}
            console.log(listing)
            httpConfig.put(`/apis/listing/${listing.listingId}`,listing)
                .then(reply => {
                        let {message, type} = reply;
                        if (reply.status === 200) {
                            resetForm();
                        }
                        setStatus({message, type});
                    }
                );
        }
    };


    return (
        <>
            <Container>
                <Formik validationSchema={validator} initialValues={initialValues} onSubmit={onSubmit}>

                    {(props) => {
                        const [selectedImage, setSelectedImage] = useState(null)
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
                            handleReset,
                            setFieldValue
                        } = props;
                        return (<>
                                <Form className="p-4" onSubmit={handleSubmit}>
                                    <h1 className="py-3 text-center mb-5">Update Listing</h1>

                                    <ImageDropZone className="dragDropBox"
                                                   formikProps={{
                                                       values,
                                                       handleChange,
                                                       handleBlur,
                                                       setFieldValue,
                                                       fieldValue: 'imageUrl',
                                                       setSelectedImage: setSelectedImage
                                                   }}

                                    />

                                    <div className="container container-fluid p-5">
                                        {selectedImage !== null ? <Image fluid={true} height={300} rounded={true} thumbnail={true} width={300}  className="d-block mx-auto img-fluid" src={selectedImage}/> :  <Image fluid={true} height={300} rounded={true} thumbnail={true} width={300}  className="d-block mx-auto img-fluid" src={ listing.listingImageUrl }/>}
                                    </div>

                                    <Form.Group className="mt-4" controlId="listingName">
                                        <Form.Label>Name of Item</Form.Label>
                                        <Form.Control onBlur={handleBlur} onChange={handleChange} value={values.listingName} type="text" placeholder="Enter Name of Item"/>
                                        <DisplayError errors={errors} touched={touched} field={"listingName"}/>
                                    </Form.Group>
                                    <Form.Group className="mt-4" controlId="listingDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control onBlur={handleBlur} onChange={handleChange} value={values.listingDescription} type="text" placeholder="Enter Description"/>
                                        <DisplayError errors={errors} touched={touched} field={"listingDescription"}/>
                                    </Form.Group>
                                    <Row>
                                        <Col sm={3}>
                                            <Form.Select onBlur={handleBlur} onChange={handleChange} value={values.listingCondition} variant="outline-secondary" className="mt-4 "
                                                         name="listingCondition">
                                                <option>Condition</option>
                                                <option value="New">New</option>
                                                <option value="Slightly Used">Slightly Used</option>
                                                <option value="Used">Used</option>
                                            </Form.Select>
                                        </Col>
                                        <Col sm={3}>
                                            <Form.Select onBlur={handleBlur} onChange={handleChange} value={values.listingCategoryId} variant="outline-secondary" className="mt-4"
                                                         name="listingCategoryId">
                                                <option>Select a category</option>
                                                {categories.map(category => <option
                                                    value={category.categoryId}>{category.categoryName}</option>)}
                                            </Form.Select>
                                        </Col>
                                    </Row>

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
                                </Form>
                                <FormDebugger {...props}/>
                                <DisplayStatus status={status}/>
                            </>
                        )
                    }
                    }

                </Formik>
            </Container>

        </>
    )
}

function ImageDropZone ({ formikProps }) {

    const onDrop = React.useCallback(acceptedFiles => {
        const formData = new FormData()
        formData.append('image', acceptedFiles[0])

        const fileReader = new FileReader()
        fileReader.readAsDataURL(acceptedFiles[0])
        fileReader.addEventListener("load", () => {
            formikProps.setSelectedImage(fileReader.result)
        })



        formikProps.setFieldValue(formikProps.fieldValue, formData)

    }, [formikProps])
    const { getRootProps, getInputProps,isDragActive } = useDropzone({ onDrop })
    return (
        <Form.Group {...getRootProps()}>
            <InputGroup>
                {/* {
                    formikProps.values.listingImageUrl &&
                    <>
                        <div>
                            <Image fluid={true} height={100} rounded={true} thumbnail={true} width={100} alt="Avatar Image" src={formikProps.values.listingImageUrl} />
                        </div>
                    </>
                }*/}
                <div className="p-4 d-flex flex-fill bg-light justify-content-center align-items-center border rounded">
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
                            <span className="text-center">Drag & Drop image here, or click here to upload a image</span>
                    }
                </div>
            </InputGroup>
        </Form.Group>

    )
}