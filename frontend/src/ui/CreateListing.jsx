import React, {useState} from "react";
import {Button, Container, DropdownButton, Image, Dropdown, Col, Row, InputGroup, FormControl} from "react-bootstrap";
import image1 from "../images/createlistingimg1.png"
import Form from "react-bootstrap/Form";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllListings, fetchListingsByProfileId} from "../store/listing.js";
import * as Yup from "yup";
import {fetchAllCategories} from "../store/categories.js";
import {Formik} from "formik";
import {httpConfig} from "./shared/utils/http-config.js";
import {DisplayError} from "./shared/components/display-error/DisplayError.jsx";
import {DisplayStatus} from "./shared/components/display-status/DisplayStatus.jsx";
import {useDropzone} from "react-dropzone";
import {FormDebugger} from "./shared/components/FormDebugger.jsx";
import {fetchCurrentUser} from "../store/currentUser.js";
import {fetchAuth} from "../store/auth.js";

export function CreateListing() {
    const auth = useSelector(state =>(state.auth))
    const createListing = {
        listingCategoryId: "",
        listingClaimed: "",
        listingCondition: "",
        listingDate: "",
        listingDescription: "",
        listingImageUrl: "",
        listingName: "",
    };
    const categories = useSelector(state => (state.categories))

    const dispatch = useDispatch()
    const initialEffects = () => {
        dispatch(fetchAllCategories())
        dispatch(fetchAuth())
    }
    React.useEffect(initialEffects, [dispatch])

    const validator = Yup.object().shape({

        listingCategoryId: Yup.string(),

        listingClaimed: Yup.boolean(),

        listingCondition: Yup.string(),

        listingDescription: Yup.string()
            .required("Description content is required"),
        listingImageUrl: Yup.mixed()
            .required("Image required"),
        listingName: Yup.string()
            .required("Listing Name is required"),


    });

    const onSubmit = (values, {resetForm, setStatus}) => {
        console.log(auth)
        //use values to create a listing. for listing profileId use profileId in auth
    httpConfig.post("/apis/image-upload", values.listingImageUrl).then(reply =>{
            let {message, type} = reply;
            if (reply.status === 200){
                submitListing(message)
            } else {
                setStatus({message, type});
            }
        }

    )
        function submitListing(listingImageUrl){
            const listing = {listingId:null, listingCategoryId: values.listingCategoryId, listingCondition: values.listingCondition,listingDescription: values.listingDescription, listingImageUrl: listingImageUrl, listingName: values.listingName, listingProfileId: auth.profileId, listingClaimed: false}
            console.log(listing)
            httpConfig.post("/apis/listing",listing)
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
                    <Formik validationSchema={validator} initialValues={createListing} onSubmit={onSubmit}>

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

                                    <ImageDropZone className="dragDropBox"
                                                   formikProps={{
                                                       values,
                                                       handleChange,
                                                       handleBlur,
                                                       setFieldValue,
                                                       fieldValue: 'listingImageUrl',
                                                       setSelectedImage: setSelectedImage
                                                   }}

                                    />

                                    <div className="container container-fluid p-5">
                                        {selectedImage !== null ? <Image fluid={true} height={300} rounded={true} thumbnail={true} width={300}  className="d-block mx-auto img-fluid" src={selectedImage}/> : ""}
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
                                            <Form.Select onBlur={handleBlur} onChange={handleChange} value={values.listingCategory} variant="outline-secondary" className="mt-4"
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