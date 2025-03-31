import { Router } from 'express';
import { orderData } from '../controller/orderWebhookController.js';

const webhookRouter =new Router();

webhookRouter.post("/orders", orderData);

export default webhookRouter;