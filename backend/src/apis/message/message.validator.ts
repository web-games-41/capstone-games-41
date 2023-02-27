import { Schema } from "express-validator";

export const messageValidator: Schema = {
    messageListingId: {
        isUUID: {
            errorMessage: 'please provide a valid messageListingId'
        }
    },
    messageProfileId: {
        isUUID: {
            errorMessage: 'please provide a valid MessageProfileId'
        }
    },
    messageReceiverId: {
        isUUID: {
            errorMessage: 'please provide a valid messageReceiverId'
        }
    },
    messageContent: {
        isLength: {
            errorMessage: 'a message cannot be longer than 300 characters',
            options: { max: 300}
        },
        trim: true,
        escape: true
    },
    messageDate: {
       isDate: true,
        errorMessage: "date is malformed",
        optional: {
           options: {
               nullable: true
           }
        },
    },
}