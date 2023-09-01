import express from "express";
import ProductManager from "../dao/ProductManager.js";
import CartManager from "../dao/cartManager.js";

const router = express.Router();
const PM = new ProductManager();
const CM = new CartManager()

//Acceso a home
router.get("/", async (req, res) => {
  const products = await PM.getProducts(req.query);
  res.render("home", {products});
});

//Acceso a products
router.get("/products", async (req, res) => {
  const products = await PM.getProducts(req.query);
  res.render("products", {products});
});

//Acceso a producto por su ID
router.get("/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = await PM.getProductById(pid);
  if (product) {
    res.render("productDetail", { product });
  } else {
    res.status(404).send({ status: "error", message: "Product not found." });
  }
});

//Acceso a cart por su ID
router.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await CM.getCart(cid);

  if (cart) {
    console.log(JSON.stringify(cart, null, 4));
    res.render("cart", { products: cart.products });
  } else {
    res.status(400).send({
      status: "error",
      message: "Error! No se encuentra el ID de Carrito!",
    });
  }
});

//Acceso al formulario
router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

//Acceso a chat
router.get("/chat", (req, res) => {
  res.render("chat");
});
export default router;
