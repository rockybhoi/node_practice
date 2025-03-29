import { Router } from "express";
import { getCustomer, deleteCustomer, customerData, updateCustomer} from "../controller/customerController.js"
import { upload } from "../middleware/fileuploadMiddleware.js";
const customerRoute = new Router();

customerRoute.post("/customer", upload.single("avatar"), customerData);
customerRoute.get("/customer", getCustomer);
customerRoute.post("/customerupdate/:id", updateCustomer);
customerRoute.delete("/customerdelete/:id", deleteCustomer);

export default customerRoute;