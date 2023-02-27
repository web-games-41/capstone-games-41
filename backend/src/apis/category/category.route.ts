import { Router } from 'express'
import {
    getAllCategoriesController,
    getCategoryByCategoryIdController,
    postCategoryController
} from "./category.controller";
import {isLoggedInController} from "../../utils/controllers/is-logged-in.controller";
import {asyncValidatorController} from "../../utils/controllers/async-validator.controller";
import {check, checkSchema} from "express-validator";
import {categoryValidator} from "./category.validator";

export const categoryRoute = Router()

categoryRoute.route('/')
    .get(getAllCategoriesController)
    .post(isLoggedInController, asyncValidatorController(checkSchema(categoryValidator)), postCategoryController)
categoryRoute.route('/:categoryId')
    .get(
        asyncValidatorController(
            [check('categoryId', 'Please provide a valid uuid').isUUID()]
        ), getCategoryByCategoryIdController
    )