import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController";
const router = Router();
router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.patch('/update', updateProduct);
router.delete('/delete', deleteProduct);
export default router;
//# sourceMappingURL=productRoutes.js.map