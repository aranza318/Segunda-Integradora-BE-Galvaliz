import express from "express";
import ProductManager from "../dao/ProductManager.js";
import CartManager from "../dao/cartManager.js";

const router = express.Router();
const PM = new ProductManager();
const CM = new CartManager()

const checkSession = (req, res, next) => {
  console.log(
    "Verificando req.session.user en checkSession:",
    req.session.user
  );
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

const checkAlreadyLoggedIn = (req, res, next) => {
  console.log("Verificando req.session en checkAlreadyLoggedIn:", req.session);
  console.log(
    "Verificando req.session.user en checkAlreadyLoggedIn:",
    req.session.user
  );
  if (req.session && req.session.user) {
    console.log("Usuario ya autenticado, redirigiendo a /profile");
    res.redirect("/profile");
  } else {
    console.log("Usuario no autenticado, procediendo...");
    next();
  }
};

//Acceso a home que ahora es login ya que no puede ver los productos quien no este registrado
router.get("/", async (req, res) => {
  const products = await PM.getProducts(req.query);
  res.render("login");
});

//Acceso a products
router.get("/products", async (req, res) => {
  const products = await PM.getProducts(req.query);
  const user = req.session.user;
  res.render("products", {products, user});
});

//Acceso a producto por su ID
router.get("/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = await PM.getProductById(pid);

  res.render("productDetail", { product });

});

//Acceso a cart por su ID
router.get("/cart", async (req, res) => {
  const cid = req.params.cid;
  const cart = await CM.getCart(cid);

  res.render("cart", { products: cart.products });
 
});

//Acceso al formulario
router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

//Acceso a chat
router.get("/chat", (req, res) => {
  res.render("chat");
});

//Acceso al login
router.get("/login",checkAlreadyLoggedIn, async (req, res) => {
  res.render("login");
});

//Acceso al registro
router.get("/register",checkAlreadyLoggedIn, async (req, res) => {
  res.render("register");
});

//Acceso al profile
router.get("/profile",checkSession, (req, res) => {
  const userData = req.session.user;
  res.render("profile", {user:userData});
});

//Acceso a restore de pass
router.get("/restore", checkSession, (req, res) => {
  res.render("restore");
});

//Fallo de ingreso
router.get("/faillogin", (req, res) =>{
  res.status(401).json({
      status:"error",
      message: "Error en el ingreso al sitio con ese mail y contraseña"
  });
})


export default router;
