import React, {useState} from "react";
import {
    Button,
    Dropdown,
    DropdownButton,
    Form,
    FormControl,
    FormLabel,
    FormSelect,
    InputGroup,
    Row
} from "react-bootstrap";
import {FormDebugger} from "./FormDebugger";
import {ImageDropZone} from "./ImageDropZone";



export const PostFormContent = (props) => {

    const [selectedImage, setSelectedImage] = useState(null)

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
    } = props;


    return (
        <>
            <form  onSubmit={handleSubmit}>
                <InputGroup>
                    <div>

                        {/*Title Input*/}
                        <FormLabel>Post Title</FormLabel>
                        <input id={"postTitle"} placeholder={"Write a title for your Post"}
                               className="form-control"
                               name="postTitle"
                               value={values.postTitle}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                        {
                            errors.postTitle && touched.postTitle && (
                                <div className="alert alert-danger">
                                    {errors.postTitle}
                                </div>
                            )
                        }
                        {/*Image Input*/}
                        <FormLabel>Image</FormLabel>
                        <div className="form-group">
                            <ImageDropZone

                                formikProps={{
                                    values,
                                    handleChange,
                                    handleBlur,
                                    setFieldValue,
                                    fieldValue:"listingImageUrl",
                                    setSelectedImage: setSelectedImage



                                }}
                            >

                            </ImageDropZone>
                            <div>
                                {selectedImage !== null ? <img src={selectedImage}/> : ""}
                            </div>


                        </div>
                        {
                            errors.listingImageUrl && touched.listingImageUrl && (
                                <div className="alert alert-danger">
                                    {errors.listingImageUrl}
                                </div>
                            )
                        }
                        {/*Select Category*/}



                        {/*Post Description*/}
                        <FormLabel className="my-2">Post Content: describe what you are offering or looking for!</FormLabel>
                        <input
                            className="form-control"
                            name="postContent"
                            type="text"
                            value={values.postContent}
                            placeholder="What do you want to say?"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            errors.postContent && touched.postContent && (
                                <div className="alert alert-danger">
                                    {errors.postContent}
                                </div>
                            )
                        }
                        <FormLabel className="my-2">Harvest or Hands</FormLabel>
                        <div>
                            <FormSelect
                                className="form-control"
                                name="postCategory"
                                type="text"
                                value={values.postCategory}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option>Choose a category</option>
                                <option value="harvest">Harvest</option>
                                <option value="hands">Hands</option>
                            </FormSelect>
                        </div>
                        {
                            errors.postCategory&& touched.postCategory && (
                                <div className="alert alert-danger">
                                    {errors.postCategory}
                                </div>
                            )
                        }

                        <div className={"mt-3"}>
                            <Button className="btn btn-primary m-2" type="submit" onClick={handleSubmit}>Post</Button>

                            <Button
                                className="btn btn-secondary m2-2" type="cancel"
                                onClick={handleReset}
                                disabled={!dirty || isSubmitting}
                            >Reset form
                            </Button>
                        </div>
                    </div>

                </InputGroup>
            </form>
            {/*<FormDebugger {...props} />*/}
            {
                status && (<div className={status.type}>{status.message}</div>)
            }

        </>
    )
};


