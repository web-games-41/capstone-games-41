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

export async function getMessageByMessageProfileIdController (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
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

export async function postMessage (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const { messageListingId,messageReceiverId,messageText } = request.body
        const profile: Profile = request.session.profile as Profile
        const messageProfileId: string = profile.profileId as string

        const message: Message = {
            messageId: null,
            messageListingId,
            messageProfileId,
            messageReceiverId,
            messageDate: null,
            messageText
        }
        const result = await insertMessage(message)
        const status: Status = {
            status: 200,
            message: result,
            data: null
        }
        return response.json(status)
    } catch (error) {
        return response.json({
            status: 500,
            message: 'Error Creating message, try again later.',
            data: null
        })
    }
}