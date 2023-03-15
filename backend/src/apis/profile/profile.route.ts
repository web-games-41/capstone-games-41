import {
    getProfileByProfileId,
    getProfilesForInbox,
    putProfileController
} from "./profile.controller";
import {asyncValidatorController} from "../../utils/controllers/async-validator.controller";
import {profileValidator} from "./profile.validator";
import {check, checkSchema} from "express-validator";
import {Router} from "express";
import {isLoggedInController} from "../../utils/controllers/is-logged-in.controller";


export const profileRoute: Router = Router()
profileRoute.route('/')
    .post(putProfileController)

profileRoute.route('/:profileId')
    .get(
        asyncValidatorController([
            check('profileId', 'Please provide a valid profileId').isUUID()
        ])
        , getProfileByProfileId
    )
    .put(isLoggedInController, asyncValidatorController(checkSchema(profileValidator)), putProfileController)

profileRoute.route('/inbox/messages')
    .get(isLoggedInController, getProfilesForInbox)