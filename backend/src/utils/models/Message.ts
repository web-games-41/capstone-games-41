import { sql } from "../database.utils"


export interface Message {
    messageId: string|null
    messageListingId: string
    messageProfileId: string
    messageReceiverId: string
    messageContent: string
    messageDate: string|Date|null
}

export async function insertMessage (message: Message): Promise<string> {
    const {messageListingId, messageProfileId, messageReceiverId, messageContent} = message
    await sql `insert into message (message_id, message_listing_id, message_profile_id, message_receiver_id, message_content, message_date) 
values (gen_random_uuid(), ${messageListingId}, ${messageProfileId}, ${messageReceiverId}, ${messageContent}, NOW())`
    return 'Message created successfully'
}

export async function selectAllMessages (): Promise<Message[]> {
    return sql<Message[]> `select message_id, message_listing_id, message_profile_id, message_receiver_id, message_content, message_date from message`
}

export async function selectMessageByMessageId (messageId: string): Promise<Message|null> {
    const result = <Message[]> await sql`select message_id, message_listing_id, message_profile_id, message_receiver_id, message_content, message_date from message where message_id = ${messageId}`
    return result?.length === 1 ? result[0] : null
}

export async function selectMessageByMessageProfileId (messageProfileId: string): Promise<Message[]> {
    return <Message[]> await sql`select message_id, message_listing_id, message_profile_id, message_receiver_id, message_content, message_date from message where message_profile_id = ${messageProfileId}`
}

export async function selectMessageByMessageReceiverId (messageReceiverId: string): Promise<Message[]> {
    return <Message[]> await sql`select message_id, message_listing_id, message_profile_id, message_receiver_id, message_content, message_date from message where message_receiver_id = ${messageReceiverId}`
}

export async function selectMessageByMessageListingId (messageListingId: string): Promise<Message[]> {
    return <Message[]> await sql`select message_id, message_listing_id, message_profile_id, message_receiver_id, message_content, message_date from message where message_listing_id = ${messageListingId}`
}

export async function selectMessagesByAllForeignKeys (messageListingId: string, messageProfileIdOne: string, messageProfileIdTwo: string): Promise<Message[]> {
    return <Message[]> await sql`select message_id, message_listing_id, message_profile_id, message_receiver_id, message_content, message_date from message where message_listing_id = ${messageListingId} and message_profile_id in (${messageProfileIdOne}, ${messageProfileIdTwo}) and message_receiver_id in (${messageProfileIdTwo}, ${messageProfileIdOne})`
}