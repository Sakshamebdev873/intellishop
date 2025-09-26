import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js";


const router = Router()
router.post('/',createProduct)
router.get('/',getProducts)
router.get('/:id',getProductById)
router.patch('/update/:id',updateProduct)
router.delete('/delete/:id',deleteProduct)
export default router;