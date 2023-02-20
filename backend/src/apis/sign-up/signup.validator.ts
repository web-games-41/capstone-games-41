import { Schema } from 'express-validator'

export const signupValidator: Schema = {
    profileAvatarUrl: {
        optional: true,
        isURL: {
            errorMessage: 'profile avatar is malformed please upload a new image'
        }
    },
    profileEmail: {
        isEmail: {
            errorMessage: 'Please provide a valid email'
        },
        //Uncomment the next line to sanitize email, but it removes +1 from testing email addresses.
        //normalizeEmail: true,
        trim: true
    },
    profilePassword: {
        isLength: {
            errorMessage: 'Password must be at least eight characters',
            options: {min: 8}
        },
        trim: true,
        escape: true
    },
    profilePasswordConfirm: {
        isLength: {
            errorMessage: 'confirm password must be at least eight characters',
            options: {min: 8}
        },
        trim: true,
        escape: true
    },
    profileName: {
        escape: true,
        trim: true,
        isLength: {
            errorMessage: 'profileName must be between seven and one hundred twenty eight',
            options: {min: 1, max: 32}
        }
    }
}