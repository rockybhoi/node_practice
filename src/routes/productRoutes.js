import { Router } from "express";
import { ProudctData } from "../controller/productControllers.js";


const prodAuth = new Router();

prodAuth.post("/products", ProudctData);

export default prodAuth;