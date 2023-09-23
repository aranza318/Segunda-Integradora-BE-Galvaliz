import { Router } from "express";
import CartManager from "../dao/cartManager.js";

const cartsRouter = Router();
const CM = new CartManager();


//Postea el nuevo carrito
cartsRouter.post("/", async (req, res) => {
  const newCart = await CM.newCart();
  if (newCart) {
      res.send(newCart);
  } else {
      res.status(500).send({
          status: "error",
          message: "Error! No se pudo crear el Carrito!",
      });
  }
});

//Busca carrito por su ID
cartsRouter.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await CM.getCart(cid);

  if (cart) {
    res.send({ products: cart.products });
  } else {
    res.status(400).send({
      status: "error",
      message: "Error! No se encuentra el ID de Carrito!",
    });
  }
});

//Agrega el producto al carrito
cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const result = await CM.addProductToCart(cid, pid);

  if (result) {
    res.send({ status: "ok", message: "El producto se agregó correctamente!" });
  } else {
    res.status(400).send({
      status: "error",
      message: "Error! No se pudo agregar el Producto al Carrito!",
    });
  }
});

//Actualiza el producto por su ID
cartsRouter.put("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity;
  const result = await CM.updateQuantityProductFromCart(cid, pid, quantity);

  if (result) {
    res.send({
      status: "ok",
      message: "El producto se actualizó correctamente!",
    });
  } else {
    res.status(400).send({
      status: "error",
      message: "Error! No se pudo actualizar el Producto del Carrito!",
    });
  }
});

//Elimina el producto del carrito
cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const result = await CM.deleteProductFromCart(cid, pid);

  if (result) {
    res.send({
      status: "ok",
      message: "El producto se eliminó correctamente!",
    });
  } else {
    res.status(400).send({
      status: "error",
      message: "Error! No se pudo eliminar el Producto del Carrito!",
    });
  }
});

//Vacia el carrito
cartsRouter.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const result = await CM.deleteProductsFromCart(cid);

  if (result) {
    res.send({ status: "ok", message: "El carrito se vació correctamente!" });
  } else {
    res.status(400).send({
      status: "error",
      message: "Error! No se pudo vaciar el Carrito!",
    });
  }
});
export default cartsRouter;
