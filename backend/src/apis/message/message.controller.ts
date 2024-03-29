import {Request, Response, NextFunction} from "express";
import {
    insertMessage,
    Message,
    selectAllMessages,
    selectMessageByMessageId,
    selectMessageByMessageListingId,
    selectMessageByMessageProfileId,
    selectMessageByMessageReceiverId,
    selectMessagesByAllForeignKeys,
    selectMessagesByProfileIds
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

export async function getMessageByMessageListingIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const {messageListingId} = request.params
        const data = await selectMessageByMessageListingId(messageListingId)
        return response.json({status: 200, message: null, data})
    } catch (error) {
        return response.json ({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getMessagesByAllForeignKeys (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const profile = request.session.profile as Profile
        const messageProfileId = profile.profileId as string
        const {messageListingId, messageProfileIdOne, messageProfileIdTwo} = request.params
        if (messageProfileId !== messageProfileIdOne || messageProfileId !== messageProfileIdTwo){
            return response.json({
                status: 400,
                message: 'you are not allowed to perform this task',
                data: []
            })
        }
        const data = await selectMessagesByAllForeignKeys(messageListingId, messageProfileIdOne, messageProfileIdTwo)
        return response.json({status: 200, message: null, data})
    } catch (error) {
        return response.json ({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getMessagesByProfileIds (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const profile = request.session.profile as Profile
        const messageProfileId = profile.profileId as string
        const {messageProfileIdOne, messageProfileIdTwo} = request.params
        console.log("messageProfileIdOne", messageProfileIdOne)
        console.log("messageProfileIdTwo", messageProfileIdTwo)
        console.log("profileIdFromSession", messageProfileId === messageProfileIdTwo)
        if (messageProfileId !== messageProfileIdOne && messageProfileId !== messageProfileIdTwo) {
            return response.json({
                status: 400,
                message: 'you are not allowed to perform this task',
                data: []
            })
        }
        const data = await selectMessagesByProfileIds(messageProfileIdOne, messageProfileIdTwo)
        return response.json({status:200, message:null, data})
    } catch (error) {
        return response.json ({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getMessageByMessageReceiverId (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const {messageReceiverId} = request.params
        const data = await selectMessageByMessageReceiverId(messageReceiverId)
        return response.json({status: 200, message: null, data})
    } catch (error) {
        return response.json({
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

        const {messageListingId, messageReceiverId, messageContent} = request.body

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