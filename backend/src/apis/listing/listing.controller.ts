import {NextFunction, Response, Request} from "express";
import {Status} from "../../utils/interfaces/Status";
import {Profile} from "../../utils/models/Profile";
import {
    deleteListing,
    insertListing,
    Listing, selectAllListings,
    selectListingByListingId,
    selectListingsByListingProfileId, updateListing
} from "../../utils/models/Listing";


export async function getAllListingsController (request: Request, response: Response): Promise<Response<Status>> {
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

export async function getListingsByListingProfileIdController (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
    try {
        const { listingProfileId } = request.params
        const data = await selectListingsByListingProfileId(listingProfileId)
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
        const { listingCategoryId, listingCondition, listingClaimed, listingDescription, listingImageUrl, listingName} = request.body
        const profile: Profile = request.session.profile as Profile
        const listingProfileId: string = profile.profileId as string

        const listing: Listing = {
            listingId: null,
            listingCategoryId,
            listingProfileId,
            listingCondition,
            listingClaimed:false,
            listingDate:null,
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

export async function putListingController (request: Request, response: Response): Promise<Response> {
    try {
        const { listingId } = request.params
        const { listingProfileId, listingCategoryId, listingCondition, listingClaimed, listingDate, listingDescription, listingImageUrl, listingName } = request.body
        const profile = request.session.profile as Profile
        const profileIdFromSession = profile.profileId as string
        const updateFailed = (message: string): Response => {
            return response.json({status: 400, data: null, message})
        }
        const performUpdate = async (listing:Listing): Promise<Response> => {
            const previousListing: Listing|null = await selectListingByListingId(listingId)
            if (previousListing === null){
                updateFailed('Listing was not found')
            }
            const newListing: Listing = { ...previousListing, ...listing}
            await updateListing(newListing)
            return response.json({status: 200, data: null, message:'Listing successfully updated'})
        }



        return listingProfileId === profileIdFromSession
        ? await performUpdate({ listingId,listingProfileId, listingCategoryId, listingCondition, listingClaimed, listingDate, listingDescription, listingImageUrl, listingName })
        : updateFailed('you are not allowed to preform this action')
    } catch (error: any) {
      return response.json({status: 400, data: null, message: error.message})
    }
}

export async function patchListingClaimedController(request: Request, response: Response): Promise<Response> {
    try {
        const {listingId} = request.params
        const profile = request.session.profile as Profile
        const profileIdFromSession = profile.profileId as string
        const listing = await selectListingByListingId(listingId)

        if (listing === null) {
            return response.json({status:404, data: null, message:"Listing not found"})
        }
        if (listing.listingProfileId !== profileIdFromSession) {
            return response.json({status:400, data: null, message: "you are not allowed to perform this task"})
        }
        listing.listingClaimed = true

        await updateListing(listing)
        return response.json({status:200, data:null, message: "listing has been successfully claimed"})
    } catch (error: any) {
        return response.json({status: 400, data: null, message: error.message})
    }
}

export async function deleteListingController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const {listingId} = request.params
        const profile = request.session.profile as Profile
        const profileIdFromSession = profile.profileId as string


        const listing = await selectListingByListingId(listingId)
        const listingProfileId = listing?.listingProfileId
        if (listingProfileId !== profileIdFromSession) {
            return response.json({status: 404, data: null, message:'You are not allowed to perform this task'})

        }


        const result = await deleteListing(listingId)
        const status: Status = {
            status: 200,
            data: null,
            message: result
        }
        return response.json(status)
        } catch (error) {
        return response.json({status: 500, data: null, message:'Error deleting listing, try again later'})
    }
}