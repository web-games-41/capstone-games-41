import {sql} from "../database.utils";

export interface PartialProfile {
    profileId: string|null
    profileAvatarUrl: string|null
    profileEmail: string
    profileName: string

}


export interface Profile {
    profileId: string|null
    profileActivationId: string|null
    profileAvatarUrl: string|null
    profileEmail: string
    profileHash: string
    profileName: string
}

/**
 * Function to insert profile object into postgres database
 * @param profile Profile object that will be updated into the database
 * @return success message if the sql statement was executed with no errors
 **/

export async function insertProfile (profile: Profile): Promise<string> {
    const {profileActivationId, profileAvatarUrl, profileEmail, profileHash, profileName} = profile
    await sql `insert into profile(profile_id, profile_activation_id, profile_avatar_url, profile_email, profile_hash, profile_name) values (gen_random_uuid(), ${profileActivationId}, ${profileAvatarUrl}, ${profileEmail}, ${profileHash}, ${profileName})`
    return 'Profile updated successfully'
}

export async function selectProfileByProfileEmail (profileEmail: string) : Promise<Profile|null> {
    const result = <Profile[]>await sql `SELECT profile_id, profile_activation_id, profile_avatar_url, profile_hash, profile_name FROM profile WHERE profile_email = ${profileEmail}`
    return result?.length === 1 ? result[0] : null
}

export async function selectWholeProfileByProfileId(profileId: string): Promise<Profile|null> {
    const result = <Profile[]>await sql`SELECT profile_Id, profile_activation_id, profile_avatar_url, profile_hash, profile_name FROM profile
    WHERE profile_id = ${profileId}`
    return result?.length === 1 ? result[0] : null
}

export async function selectPartialProfileByProfileId(profileId: string): Promise<Profile|null> {
    const result = <Profile[]>await sql `SELECT profile_id, profile_avatar_url, profile_hash, profile_name FROM profile WHERE profile_id = ${profileId}`
    return result?.length === 1 ? result[0] : null
}

export async function selectProfileByProfileActivationId (profileActivationId: string): Promise<Profile|null> {
    const result = <Profile[]>await sql `SELECT profile_id, profile_activation_id, profile_hash, profile_avatar_url, profile_email, profile_name FROM profile WHERE profile_activation_id = ${profileActivationId}`
    return result?.length === 1 ? result[0] : null
}

export async function updateProfile (profile: Profile): Promise<string> {
    const {profileId, profileActivationId, profileHash, profileAvatarUrl, profileEmail, profileName} = profile
    await sql `UPDATE profile SET profile_activation_id = ${profileActivationId}, profile_hash = ${profileHash}, profile_avatar_url = ${profileAvatarUrl}, profile_email = ${profileEmail}, profile_name = ${profileName} WHERE profile_id = ${profileId}`
    return 'Profile successfully updated'
}























