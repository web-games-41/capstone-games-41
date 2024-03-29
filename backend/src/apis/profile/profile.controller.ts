import { Request, Response } from "express";
import {
    PartialProfile,
    Profile,
    selectPartialProfileByProfileId, selectProfilesForInbox,
    selectWholeProfileByProfileId, updateProfile
} from "../../utils/models/Profile";
import {Status} from "../../utils/interfaces/Status";


/**
 * Expresss controller
 *
 */

export async function putProfileController (request: Request, response: Response): Promise<Response> {
    try {
        const { profileId } = request.params
        const { profileEmail, profileName } = request.body
        const profileAvatarUrl = request.body.profileAvatarUrl ?? null
        const profile = request.session.profile as Profile
        const profileIdFromSessions = profile.profileId as string

        const preformUpdate = async (partialProfile: PartialProfile): Promise<Response> => {
            const previousProfile: Profile = await selectWholeProfileByProfileId(partialProfile.profileId as string) as Profile
            const newProfile: Profile = { ...previousProfile, ...partialProfile }
            await updateProfile(newProfile)
            return response.json({status: 200, data: null, message: 'Profile successfully updated'})
        }

        const updateFailed = (message: string): Response => {
            return  response.json({status: 400, data: null, message})
        }

        return profileId === profileIdFromSessions
        ? await preformUpdate({profileId, profileAvatarUrl, profileEmail, profileName})
            :updateFailed('You are not allowed to preform this action')
     } catch (error: any) {
        return response.json({status: 400, data: null, message: error.message})
    }
}

export async function getProfileByProfileId (request: Request, response: Response): Promise<Response> {
    try {
        const { profileId } = request.params
        const mySqlResult = await selectPartialProfileByProfileId(profileId)
        const data = mySqlResult ?? null
        const status: Status = { status: 200, data, message: null }
        return response.json(status)
    } catch (error: any) {
        return (response.json({status: 400, data: null, message: error.message}))
    }
}

export async function getProfilesForInbox (request: Request, response: Response): Promise<Response> {
    try {
        const profile = request.session.profile as Profile
        const profileIdFromSessions = profile.profileId as string

        const data = await selectProfilesForInbox(profileIdFromSessions)
        const status: Status = { status: 200, data, message: null}
        return response.json(status)
    } catch (error: any) {

        return (response.json({status: 400, data: null, message: error.message}))
    }
}


