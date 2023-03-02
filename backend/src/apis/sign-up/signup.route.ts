
import {checkSchema, param} from "express-validator";
import {Router} from "express";
import {signupProfileController} from "./sign-up.controller";
import { signupValidator } from "./signup.validator";
import {asyncValidatorController} from "../../utils/controllers/async-validator.controller";
import {activationController} from "./activation.controller";

export const signUpRoute: Router = Router()

signUpRoute.route('/')
.post(
    asyncValidatorController(checkSchema(signupValidator)),
    signupProfileController
)

signUpRoute.route('/activation/:activation')
    .get(
        asyncValidatorController([param('activation', 'invalid activation link').isHexadecimal().notEmpty()]), activationController
    )
