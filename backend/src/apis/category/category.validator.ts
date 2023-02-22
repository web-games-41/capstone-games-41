import { Schema } from 'express-validator'


export const categoryValidator: Schema = {
    categoryName: {
        isLength: {
            errorMessage: 'choose a category',
            options: { min: 1, max: 32 }
        }
    }
}