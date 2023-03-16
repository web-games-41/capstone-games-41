import { Schema } from "express-validator";
import postgres from "postgres";
import value = postgres.toPascal.value;

export const listingValidator: Schema = {
    listingProfileId: {
        isUUID: {
            errorMessage: 'please provide a valid ListingProfileId'
        }
    },
    listingCategoryId:{
        isUUID: {
            errorMessage: 'Please provide a valid ListingCategoryId'
        }
    },
    listingClaimed:{
        isBoolean:{
            errorMessage:'Please provide a boolean for listing claimed'
        }
    },
    listingCondition:{
        errorMessage: "Please enter a valid condition",
        custom: {
            options: (value) => {
                const conditions = ["New", "Slightly Used", "Used"];
                conditions.includes(value);
                if (conditions.includes(value) === true){
                    return true
                }else return false
            }
        }

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