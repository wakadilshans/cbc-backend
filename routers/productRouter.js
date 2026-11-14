import express from 'express';
import { createProduct, deleteProdcut, getProduct, getProductByName } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/", getProduct);
//productRouter.get("/byName", getProductByName); //json way

productRouter.get("/filter", (req, res) => {
    res.json({
        message: "this is product filtering"
    })
})

productRouter.post("/", createProduct);
productRouter.delete("/:name", deleteProdcut); //name means input parameter in data base(its a json tag)
productRouter.get("/:name", getProductByName); //:denmt psse link eke ewna onima route ekk enwa name lesa slakanwaaaa

export default productRouter;