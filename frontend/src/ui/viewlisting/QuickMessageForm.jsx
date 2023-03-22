import {httpConfig} from "../shared/utils/http-config.js";
import {DisplayError} from "../shared/components/display-error/DisplayError.jsx";
import {DisplayStatus} from "../shared/components/display-status/DisplayStatus.jsx";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from 'yup';
import {Formik} from "formik";
import Form from "react-bootstrap/Form";
import {Button, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useParams} from "react-router-dom";
import {fetchAllCategories} from "../../store/categories.js";
import React from "react";
import {fetchAuth} from "../../store/auth.js";

export const SendMessageForm = (props) => {
    const {listing} = props
    const auth = useSelector(state => (state.auth))


    const dispatch = useDispatch()
    const initialEffects = () => {
        dispatch(fetchAuth())
    }
    React.useEffect(initialEffects, [dispatch])

    const validator = Yup.object().shape({
        messageContent: Yup.string()
            .required('message is required to send a message'),
    });

    //the initial values object defines what the request payload is.
    const message = {
        messageContent: ""
    };

    const submitMessage = (values, {resetForm, setStatus}) => {
        const message = {messageListingId: listing.listingId, messageProfileId: auth.profileId, messageReceiverId: listing.listingProfileId, messageContent: values.messageContent, messageDate: null}
        httpConfig.post("/apis/message", message)
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
            <Formik initialValues={message}
                    onSubmit={submitMessage}
                    validationSchema={validator}
            >
                {SendMessageFormContent}
            </Formik>
        </>
    )
};

export function SendMessageFormContent (props) {
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
                <Form.Group className="mb-3" controlId="profileEmail">
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon="envelope"/>
                        </InputGroup.Text>
                        <Form.Control name="messageContent" onBlur={handleBlur} onChange={handleChange}
                                      value={values.messageContent} type="text" placeholder="is this Item Available?"/>
                    </InputGroup>
                    <DisplayError errors={errors} touched={touched} field={"messageContent"}/>
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
        </>
    )
}