import express from "express";
import Handlebars from "handlebars";
import expressHandlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cartsRouter from "./src/routes/cart.routes.js";
import productsRouter from "./src/routes/product.routes.js";
import viewsRouter from "./src/routes/views.routes.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";


const app = express();
//Puerto
const port = 8004;

//Server
const httpServer = app.listen(port, () => {
  console.log("Servidor escuchando en puerto " + port);
});
export const socketServer = new Server(httpServer);

//Socket Server
app.set("socketServer", socketServer);

//Engine, rutas y mids
app.engine(
  "handlebars",
  expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname));

app.use(express.static(__dirname+"/src/public"))
app.use("/images", express.static(__dirname+ "/src/public/images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/", viewsRouter);

//Managers
import ProductManager from "./src/dao/ProductManager.js";
const PM = new ProductManager();

import MessagesManager from "./src/dao/messagesmanager.js";
const MM = new MessagesManager();

import CartManager from "./src/dao/cartManager.js";
const CM = new CartManager();

//Mongo connect
mongoose.connect(
  "mongodb+srv://agalvaliz318:Imagine318@aranza.g9tojob.mongodb.net/ecommerce?retryWrites=true&w=majority"
);

mongoose.connection.on("connected", () => {
  console.log("Conectado a MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error conectando a MongoDB:", err);
});

//Sockets on 
socketServer.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");

  const allProducts = await PM.getProducts();
  socket.emit("initial_products", allProducts);

  socket.on("addProduct", async(obj)=>{
    await PM.addProduct(obj);
    const listadeproductos = await PM.getProductsViews();
    socketServer.emit("envioDeProductos", listadeproductos);    
});

  socket.on("deleteProduct",async(id)=>{
    console.log(id);
    const listadeproductos=await PM.getProductsViews();
    
    await PM.deleteProduct(id);
    
    socketServer.emit("envioDeProducts", listadeproductos);
    });

  socket.on("nuevoUsuario",(usuario)=>{
    console.log("usuario", usuario);
    socket.broadcast.emit("broadcast", usuario);
    });

  socket.on("disconnet", ()=>{
    console.log("Usuario desconectado");
    });

  socket.on("mensaje", async (info) =>{
    console.log(info);
    await MM.createMessage(info);
    socketServer.emit("chat", await MM.getMessages());
});
});
