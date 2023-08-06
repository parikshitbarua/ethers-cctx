import express from 'express';
import {validAddressCheck} from "../service/validAddressCheck.service.js";
import {generateNewWallet} from "../service/generateNewWallet.service.js";

export const appRouter = express.Router();

appRouter.route('/is-address').post(validAddressCheck);

appRouter.route('/create-wallet').post(generateNewWallet);