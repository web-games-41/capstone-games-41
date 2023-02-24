import { sql } from "../database.utils";

export interface Listing {
    listingId: string|null
    listingCategoryId: string
    listingProfileId: string
    listingCondition: string
    listingClaimed: boolean
    listingDate: Date|null|string
    listingDescription: string
    listingImageUrl: string
    listingName: string
}

export async function insertListing (listing: Listing): Promise<string> {
    const {listingProfileId, listingCategoryId, listingCondition, listingClaimed, listingDescription, listingImageUrl, listingName} = listing
    await sql `INSERT INTO listing (listing_id, listing_category_id, listing_profile_id, listing_condition, listing_description, listing_image_url, listing_name) `
}