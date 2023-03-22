import {useDispatch, useSelector} from "react-redux";
import {fetchAuth} from "../../../store/auth.js";
import * as Yup from "yup";
import {httpConfig} from "../../shared/utils/http-config.js";
import {Formik} from "formik";
import Form from "react-bootstrap/Form";
import {Button, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DisplayError} from "../../shared/components/display-error/DisplayError.jsx";
import {DisplayStatus} from "../../shared/components/display-status/DisplayStatus.jsx";
import React from "react";
import {useParams} from "react-router-dom";

export const SendMessageForm = (props) => {
    const {messageListingId} = props
    const auth = useSelector(state => (state.auth))
    const {messageProfileIdOne,messageProfileIdTwo} = useParams()

    const dispatch = useDispatch()
    const initialEffects = () => {
        dispatch(fetchAuth())
    }
    React.useEffect(initialEffects, [dispatch])

    const validator = Yup.object().shape({
        messageContent: Yup.string()
            .required('Need a Message'),
    });

    //the initial values object defines what the request payload is.
    const message = {
        messageContent: ""
    };

    const submitMessage = (values, {resetForm, setStatus}) => {
        let messageReceiverId = messageProfileIdOne !== auth.profileId ? messageProfileIdOne : messageProfileIdTwo;
        /*if (messageProfileIdOne !== auth.profileId) {*/
            const message = {
                messageListingId: messageListingId,
                messageProfileId: auth.profileId,
                messageReceiverId: messageReceiverId,
                messageContent: values.messageContent,
                messageDate: null
            }
            httpConfig.post("/apis/message", message)
                .then(reply => {
                        let {message, type} = reply;
                        if (reply.status === 200) {
                            resetForm();
                        }
                        setStatus({message, type});
                    }
                );
       /* }*/
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
                                      value={values.messageContent} type="text" placeholder="Send a Message"/>
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