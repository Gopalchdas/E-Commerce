import express from "express";
import { addProduct,deleteProduct,getAllProducts, updateProduct} from "../controller/productController.js";
import { isAdminAuthenticated } from "../middleware/auth.js";
const router=express.Router();
router.post('/addproduct',isAdminAuthenticated,addProduct);
router.get('/getallproduct',getAllProducts);
router.put('/updateproduct/:id',isAdminAuthenticated,updateProduct);
router.delete('/updateproduct/:id',isAdminAuthenticated,deleteProduct);
export default router;