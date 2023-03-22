import {sql} from "../database.utils";

export interface PartialProfile {
    profileId: string|null
    profileAvatarUrl: string|null
    profileEmail: string
    profileName: string

}


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
    await sql `insert into profile(profile_id, profile_activation_token, profile_avatar_url, profile_email, profile_hash, profile_name) values (gen_random_uuid(), ${profileActivationToken}, ${profileAvatarUrl}, ${profileEmail}, ${profileHash}, ${profileName})`
    return 'Profile updated successfully'
}

export async function selectProfileByProfileEmail (profileEmail: string) : Promise<Profile|null> {
    const result = <Profile[]>await sql `SELECT profile_id, profile_activation_token, profile_avatar_url, profile_hash, profile_name FROM profile WHERE profile_email = ${profileEmail}`
    return result?.length === 1 ? result[0] : null
}

export async function selectWholeProfileByProfileId(profileId: string): Promise<Profile|null> {
    const result = <Profile[]>await sql`SELECT profile_id, profile_activation_token, profile_avatar_url, profile_hash, profile_name FROM profile
    WHERE profile_id = ${profileId}`
    return result?.length === 1 ? result[0] : null
}

export async function selectPartialProfileByProfileId(profileId: string): Promise<Profile|null> {
    const result = <Profile[]>await sql `SELECT profile_id, profile_avatar_url, profile_email, profile_name FROM profile WHERE profile_id = ${profileId}`
    return result?.length === 1 ? result[0] : null
}

export async function selectProfileByProfileActivationToken (profileActivationToken: string): Promise<Profile|null> {
    const result = <Profile[]>await sql `SELECT profile_id, profile_activation_token, profile_hash, profile_avatar_url, profile_email, profile_name FROM profile WHERE profile_activation_token = ${profileActivationToken}`
    return result?.length === 1 ? result[0] : null
}

export async function updateProfile (profile: Profile): Promise<string> {
    const {profileId, profileActivationToken, profileHash, profileAvatarUrl, profileEmail, profileName} = profile
    await sql `UPDATE profile SET profile_activation_token = ${profileActivationToken},profile_hash = ${profileHash},profile_avatar_url = ${profileAvatarUrl},profile_email = ${profileEmail},profile_name = ${profileName} WHERE profile_id = ${profileId}`
    return 'Profile successfully updated'
}

export async function selectProfilesForInbox (profileId: string): Promise<PartialProfile[]> {
    return <PartialProfile[]> await sql `select distinct profile_id, profile_avatar_url, profile_email, profile_name from profile join message on profile.profile_id = message.message_profile_id or profile.profile_id = message.message_receiver_id where profile_id != ${profileId} and (message.message_profile_id = ${profileId} or message.message_receiver_id = ${profileId}) ;`
}






















