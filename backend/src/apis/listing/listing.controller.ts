import {NextFunction, Response} from "express";
import {Status} from "../../utils/interfaces/Status";
import {Profile} from "../../utils/models/Profile";


export async function getAllListingsController (request: Request, response: Response): Promise<Response<Response<Status>> {
    try {
        const data = await selectAllListings()
        // return the response
        const status: Status = { status: 200, message: null, data }
        return response.json(status)
    }   catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getListingsByListingsIdController (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
    try {
        const { listingProifileId } = request.params
        const data = await selectListingsByListingProfileId(listingProifileId)
        return response.json({status: 200, message:null, data })
    }   catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getListingByListingIdController (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
    try {
        const { listingId } = request.params
        const data = await selectListingByListingId(listingId)
        return response.json({status: 200, message: null, data })
    }   catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: null
        })
    }
}

export async function postListing (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const { listingContent } = request.body
        const profile: Profile = request.session.profile as Profile
        const listingProfileID: string = profile.profileId as string

        const listing: Listing = {
            listingId: null,
            listingCategoryId,
            listingProfileId,
            listingCondition,
            listingClaimed
            listingDate:null
            listingDescription,
            listingImageUrl,
            listingName,
        }
        const result = await insertListing(listing)
        const status: Status = {
            status: 200,
            message:result,
            data: null
        }
        return response.json(status)
    } catch (error) {
        return response.json({
            status: 500,
            message: 'Error Creating listing try again later.',
            data: null
        })

    }
}