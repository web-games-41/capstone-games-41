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
    const {listingCategoryId, listingProfileId, listingCondition, listingClaimed, listingDescription, listingImageUrl, listingName} = listing
    await sql `INSERT INTO listing (listing_id, listing_category_id, listing_profile_id, listing_condition, listing_claimed, listing_date, listing_description, listing_image_url, listing_name) values (gen_random_uuid(), ${listingCategoryId}, ${listingProfileId}, ${listingCondition}, ${listingClaimed}, now(), ${listingDescription}, ${listingImageUrl}, ${listingName})`
    return 'Listing created successfully'
}
export async function selectAllListings (): Promise<Listing[]> {
    return sql <Listing[]> `SELECT listing_id, listing_category_id, listing_profile_id, listing_condition, listing_claimed, listing_date, listing_description, listing_image_url, listing_name FROM listing ORDER BY listing_date DESC`
}

export async function selectListingByListingId (listingId: string): Promise<Listing|null> {
    const result = <Listing[]> await sql`SELECT listing_id, listing_category_id, listing_profile_id, listing_condition, listing_claimed, listing_date, listing_description, listing_image_url, listing_name FROM listing WHERE listing_id = ${listingId}`
     return result?.length === 1 ? result[0] : null
}

export async function selectListingsByListingProfileId (listingProfileId:string): Promise<Listing[]> {
    return <Listing[]> await sql`SELECT listing_id, listing_category_id, listing_profile_id, listing_condition, listing_claimed, listing_date, listing_description, listing_image_url, listing_name FROM listing WHERE listing_profile_id = ${listingProfileId}`
}

export async function updateListing (listing: Listing): Promise<string> {
    const { listingId, listingCategoryId, listingCondition, listingClaimed, listingDate, listingDescription, listingImageUrl, listingName } = listing
    console.log(listing)
    await sql `UPDATE listing SET  listing_category_id = ${listingCategoryId}, listing_condition = ${listingCondition}, listing_claimed = ${listingClaimed}, listing_date = ${listingDate}, listing_description = ${listingDescription}, listing_image_url = ${listingImageUrl}, listing_name = ${listingName} WHERE listing_id = ${listingId}`
    return 'Listing successfully updated'

}

export async function deleteListing (listingId: string): Promise<string> {
    await sql `DELETE FROM listing WHERE listing_id = ${listingId}`
    return 'Listing successfully deleted'
}
