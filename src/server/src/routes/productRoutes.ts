import { Router, Request, Response } from 'express';
import { addProduct, getCategories, getProducts } from '../controllers/productController'; // Importando o controlador de produto
import { verifyTokenMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/addproduct', verifyTokenMiddleware, async (req: Request, res: Response) => {
  await addProduct(req, res);
});

router.get('/categories', getCategories);
router.get('/products', getProducts);


export default router;