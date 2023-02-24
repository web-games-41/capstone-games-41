import { Schema } from "express-validator";

export const messageValidator: Schema = {
    messageProfileId: {
        isUUID: {
            errorMessage: 'please provide a valid MessageProfileId'
        }
    },
    messageListingId: {
        isUUID: {
            errorMessage: 'please provide a valid messageListingId'
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