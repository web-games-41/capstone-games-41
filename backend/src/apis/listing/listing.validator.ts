import { Schema } from "express-validator";

export const listingValidator: Schema = {
    listingProfileId: {
        isUUID: {
            errorMessage: 'please provide a valid ListingProfileId'
        }
    },
    listingCategoryId:{
        isUUID: {
            errorMessage: 'please provide a valid ListingCategoryId'
        }
    },
    listingCondition:{
        isLength: {
            errorMessage:'listing condition cannot be longer than 128 characters',
            options: { max: 128 }
        },
        trim: true,
        escape: true
    },
    listingDate:{
        toDate: true
    },
    listingDescription: {
        isLength: {
            errorMessage:'listing description cannot be longer than 512 characters',
            options: { max: 512 }
        },
        trim: true,
        escape: true
    },
    listingImageUrl: {
        isLength: {
            errorMessage:'please provide a valid image',
            options: { max: 256 }
        },
        trim: true,
        escape: true
    },
    listingName:{
        isLength: {
            errorMessage:'listing name cannot be longer than 128 characters',
            options: { max: 128 }
        },
        trim: true,
        escape: true
    },
}