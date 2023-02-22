import {sql} from "../database.utils";


export interface Profile {
    profileId: string|null
    profileActivationToken: string|null
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
    const {profileActivationToken, profileAvatarUrl, profileEmail, profileHash, profileName} = profile
    await sql `insert into profile(profile_id, profile_activation_id, profile_avatar_url, profile_email, profile_hash, profile_name) values (gen_random_uuid(), ${profileActivationToken}, ${profileAvatarUrl}, ${profileEmail}, ${profileHash}, ${profileName})`
    return 'Profile updated successfully'
}

export async function selectProfileByProfileEmail (profileEmail: string) : Promise<Profile|null> {
    const result = <Profile[]>await sql `SELECT profile_id, profile_activation_id, profile_avatar_url, profile_hash, profile_name FROM profile WHERE profile_email = ${profileEmail}`
    return result?.length === 1 ? result[0] : null
}

export async function