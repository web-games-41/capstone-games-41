import { Router } from 'express'
import {
    deleteListingController,
    getAllListingsController,
    getListingByListingIdController,
    getListingsByListingProfileIdController,
    postListing, putListingController,
} from "./listing.controller";
import { asyncValidatorController } from "../../utils/controllers/async-validator.controller";
import { check, checkSchema } from "express-validator";
import { isLoggedInController } from "../../utils/controllers/is-logged-in.controller";
import { listingValidator } from "./listing.validator";

const listingRoute = Router()
listingRoute.route('/:listingId')
    .get(asyncValidatorController([
    check('listingId','please provide a valid listingId').isUUID()
]), getListingByListingIdController)
    .put(isLoggedInController,asyncValidatorController(checkSchema((listingValidator))), putListingController)
    .delete(isLoggedInController,asyncValidatorController([check('listingId','please provide a valid listingId').isUUID()]),deleteListingController)


listingRoute.route('/listingProfileId/:listingProfileId').get(asyncValidatorController([
    check('listingProfileId', 'please provide a valid listingProfileId').isUUID()
]), getListingsByListingProfileIdController)

listingRoute.route('/')
    .get(getAllListingsController)
    .post(isLoggedInController,asyncValidatorController(checkSchema((listingValidator))), postListing)

export default listingRoute

