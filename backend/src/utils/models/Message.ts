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
    const {messageListingId, messageProfileId, messageReceiverId, messageContent, messageDate} = message
    const formattedDate = messageDate ? `${messageDate as string} 12:59:59.999` : null
    await sql `insert into message (message_id, message_listing_id, message_profile_id, message_receiver_id, message_content, message_date) 
values (gen_random_uuid(), ${messageListingId}, ${messageProfileId}, ${messageReceiverId}, ${messageContent}, ${messageDate})`
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