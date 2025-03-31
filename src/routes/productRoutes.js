import { Router } from "express";
import { productCreate, ProudctData } from "../controller/productControllers.js";


const prodAuth = new Router();

prodAuth.get("/products", ProudctData);
prodAuth.post("/product", productCreate);

export default prodAuth;