import { Router, Request, Response } from 'express';
import { addProduct, getCategories, getProducts, searchProduct } from '../controllers/productController'; // Importando o controlador de produto
import { verifyTokenMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/addproduct', verifyTokenMiddleware, async (req: Request, res: Response) => {
  await addProduct(req, res);
});

router.get('/search/:searchString', searchProduct);
router.get('/categories', getCategories);
router.get('/productList', getProducts);



export default router;