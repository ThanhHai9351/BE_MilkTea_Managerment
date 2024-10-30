import express from 'express';
import { upload } from '~/globals/utils/upload.utils';
import { productController } from '../controller/product.controller';

const productRoute = express.Router();

productRoute.post('/', upload.single('mainImage'), productController.addProduct);
productRoute.get('/', productController.getAllProducts);
productRoute.get('/:id', productController.getOneProduct);
productRoute.put('/:id', upload.single('mainImage'), productController.updateProduct);
productRoute.delete('/:id', productController.deleteProduct);

export default productRoute;