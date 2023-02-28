import { Router} from "express";
import {asyncValidatorController} from "../../utils/controllers/async-validator.controller";
import {
    getAllMessageController,
    getMessageByMessageIdController,
    getMessageByMessageListingIdController,
    getMessageByMessageProfileIdController,
    getMessageByMessageReceiverId,
    getMessagesByAllForeignKeys,
    postMessageController
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

messageRouter.route('/messageListingId/:messageListingId')
    .get(asyncValidatorController([check('messageListingId', 'please provide a valid listing id').isUUID()]), getMessageByMessageListingIdController)

messageRouter.route('/messageReceiverId/:messageReceiverId')
    .get(asyncValidatorController([check('messageReceiverId', 'please provide a valid receiver id').isUUID()]), getMessageByMessageReceiverId)

messageRouter.route('/messagesByAllForeignKeys/:messageListingId/:messageProfileIdOne/:messageProfileIdTwo')
    .get(asyncValidatorController([check('messageListingId', 'please provide the right messageListingId').isUUID(), check('messageProfileIdOne', 'please provide the right messageProfileIdOne').isUUID(), check('messageProfileIdTwo', 'please provide the right messageProfileIdTwo').isUUID()]), getMessagesByAllForeignKeys)

messageRouter.route('/')
    .get(getAllMessageController)
    .post(isLoggedInController, asyncValidatorController(checkSchema(messageValidator)), postMessageController)