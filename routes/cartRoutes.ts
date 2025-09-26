import { Router } from "express";
import { addToCart, clearCart, getCart, removeCartItem, updateCartItem } from "../controllers/cartControllers.js";


const router = Router()

router.post('/add',addToCart)
router.get('/show',getCart)
router.patch("/update",updateCartItem)
router.delete('/remove/:productId',removeCartItem)
router.get('/delete',clearCart)
export default router