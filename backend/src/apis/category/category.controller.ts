import { Request, Response } from "express";
import {Category, insertCategory, selectAllCategories, selectCategoryByCategoryId} from "../../utils/models/Category";
import { Status } from '../../utils/interfaces/Status'


/**
 * Express controller that returns all category objects in the database or an empty array if an error occurred, when the endpoint GET apis/category/ is called
 * @param request An object modeling the current request provided by Express
 * @param response an object modeling the response that will be sent to the server
 * @return A promise containing a status object with the request information set to the data field
 */
export async function getAllCategoriesController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const data = await selectAllCategories()
        // return the response
        const status: Status = { status: 200, message: null, data }
        return response.json(status)
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}
/**
 *
 * @param request
 * @param response
 */
export async function getCategoryByCategoryIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const {categoryId} = request.params
        const data = await selectCategoryByCategoryId(categoryId)
        // return the response
        const status: Status = { status: 200, message: null, data}
        return response.json(status)
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

/**
 * Express controller that creates a status object and inserts it into the database when the endpoint POST apis/category/ is called
 * @param request
 * @param response
 * @return A promise containing a status object with either a success or failure message set to the message field
 */

export async function postCategoryController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const { categoryName } = request.body

        const category: Category = { categoryId: null, categoryName}
        const result = await insertCategory(category)
        const status: Status = {
            status: 200,
            message: result,
            data: null
        }
        return response.json(status)
    } catch (error) {
        console.error(error)
        return response.json({
            status: 500,
            message: 'Error Creating status try again later',
            data: null
        })
    }
}