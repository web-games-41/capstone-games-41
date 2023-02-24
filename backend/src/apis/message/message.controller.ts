import {Request, Response, NextFunction} from "express";
import {
    insertMessage,
    Message,
    selectAllMessages,
    selectMessageByMessageId,
    selectMessageByMessageProfileId
} from "../../utils/models/Message";
import { Status } from "../../utils/interfaces/Status";
import { Profile } from "../../utils/models/Profile";


export async function getAllMessageController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const data = await selectAllMessages()
        //return the response
        const status: Status = { status: 200, message: null, data }
        return response.json(status)
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getMessageByMessageProfileIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const {messageProfileId} = request.params
        const data = await selectMessageByMessageProfileId(messageProfileId)
        return response.json({status: 200, message: null, data})
    } catch (error) {
        return response.json ({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getMessageByMessageIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const { messageId } = request.params
        const data = await selectMessageByMessageId(messageId)
        const status: Status = { status: 200, message: null, data}
        return response.json(status)
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}


export async function postMessageController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const profile = request.session.profile as Profile
        const messageProfileId = profile.profileId as string
        const messageReceiverId = profile.profileId as string

        const {messageListingId, messageContent} = request.body

        const message: Message = {
            messageId: null,
            messageListingId,
            messageProfileId,
            messageReceiverId,
            messageContent,
            messageDate: null
        }
        const result: string = await insertMessage(message)
        return response.json({status: 200, data: null, result})
    } catch (error) {
        console.log(error)
        return response.json({
            status: 500,
            message: 'internal server error',
            data: null
        })
    }
}