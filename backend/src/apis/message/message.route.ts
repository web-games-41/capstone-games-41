import { Router} from "express";
import {asyncValidatorController} from "../../utils/controllers/async-validator.controller";
import {
    getAllMessageController,
    getMessageByMessageIdController,
    getMessageByMessageProfileIdController, postMessageController
} from "./message.controller";
import {isLoggedInController} from "../../utils/controllers/is-logged-in.controller";
import {check, checkSchema} from "express-validator";
import { messageValidator } from "./message.validator";


export const messageRouter: Router = Router()
messageRouter.route('/:messageId').get(asyncValidatorController([
    check('messageId', 'please provide a valid message id').isUUID()
]), getMessageByMessageIdController)

messageRouter.route('/messageProfileId/:messageProfileId').get(asyncValidatorController([
    check('messageProfileId', 'please provide a valid messageProfileId').isUUID()
]), getMessageByMessageProfileIdController)

messageRouter.route('/')
    .get(getAllMessageController)
    .post(isLoggedInController, asyncValidatorController(checkSchema(messageValidator)), postMessageController)