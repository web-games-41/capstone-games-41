import { sql } from "../database.utils"


export interface Message {
    messageId: string|null
    messageListingId: string
    messageProfileId: string
    messageReceiverId: string
    messageDate: string|Date|null
    messageContent: string
}

export async function insertMessage (message: Message): Promise<string> {
    const {messageListingId, messageProfileId, messageReceiverId, messageDate, messageContent} = message
    const formattedDate = messageDate ? `${messageDate as string} 12:59:59.999` : null
    await sql `insert into message (message_id, message_listing_id, message_profile_id, message_receiver_id, message_date, message_content) 
values (gen_random_uuid(), ${messageListingId}, ${messageProfileId}, ${messageReceiverId}, ${messageDate}, ${messageContent})`
    return 'Message created successfully'
}

export async function selectAllMessages (): Promise<Message[]> {
    return sql<Message[]> `select message_id, message_listing_id, message_profile_id, message_receiver_id, message_date, message_content from message`
}

export async function selectMessageByMessageId (messageId: string): Promise<Message|null> {
    const result = <Message[]> await sql`select message_id, message_listing_id, message_profile_id, message_receiver_id, message_date, message_content from message where message_id = ${messageId}`
    return result?.length === 1 ? result[0] : null
}

export async function selectMessageByMessageProfileId (messageProfileId: string): Promise<Message[]> {
    return <Message[]> await sql`select message_id, message_listing_id, message_profile_id, message_receiver_id, message_date, message_content from message where message_profile_id = ${messageProfileId}`
}