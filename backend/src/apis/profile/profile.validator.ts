import {Schema} from "express-validator";


export const profileValidator: Schema = {
    profileId: {
        isUUID: {
            errorMessage: 'Please provide a valid profileId'
        }
    },
    profileAvatarUrl: {
        optional: {
            options: {
                nullable: true
            }
        },
        isURL: {
            errorMessage: 'Profile avatar is malformed please upload a new image'
        }
    },
    profileEmail: {
        isEmail: {
            errorMessage: 'Please provide valid email'
        },
        trim: true
    },
    profileName: {
        escape: true,
        trim: true,
        isLength: {
            errorMessage: 'Please provide a name',
            options: {min: 1, max: 128}
        }
    }
}


