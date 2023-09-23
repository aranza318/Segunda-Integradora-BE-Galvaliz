import express  from "express";
import userManager from "../dao/userManager.js";
import { createHash } from "../midsIngreso/bcrypt.js";
import passport from "passport";
import { passportCall, authorization } from "../midsIngreso/passAuth.js";
import jwt from "jsonwebtoken";

const PRIVATE_KEY = "S3CR3T0NTH3M0UNT41N";
const router = express.Router();
const UM = new userManager();

//Login
router.post(
    "/login",
    passport.authenticate("login", { failureRedirect: "/faillogin" }),
  
    async (req, res) => {
      if (!req.user) {
        return res.status(401).send({
          status: "Error",
          message: "Usuario y Contraseña incorrectos!",
        });
      }
      const { email, password } = req.body;
  
      let token = jwt.sign(
        { email: email, password: password, rol: "user" },
        PRIVATE_KEY,
        { expiresIn: "24h" }
      );
      res.cookie("coderCookieToken", token, {
        maxAge: 3600 * 1000,
        httpOnly: true,
      });
  
      console.log("token", token);
  
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        rol: req.user.rol
      };
      return res.status(200).json({ status: "success", redirect: "/products" });
  }
  );
  

//Registro
router.post("/register",(req,res, next)=>{ 
    passport.authenticate("register", (err, user, info) => {
    if(err){
        return res.status(500).json({status:"error", message: "Error interno"})
    }
    if(!user){
        return res.status(401).json({status:"error", message: "Error al registarte bajo esos datos"})
    }
    req.logIn(user, (logInError)=>{
        if(logInError){
            return res.status(500).json({status:"error", message: "Error interno"})
        }
        return res.status(200).json({status:"success", redirect:"/login"})
    })
})(req, res, next); 
   
})

//Logout
router.post("/logout", async (req, res) => {
    req.session.destroy(err => {
        if(err) {
          return res.redirect('/profile');
        }
          res.redirect('/login');
      });
});

//Restore
router.get("/restore", async (req, res) => {
    let {user, pass} = req.query;
    pass = createHash(pass);
    const passwordRestored = await UM.restorePassword(user, pass);

    if (passwordRestored) {
        res.send({status:"OK", message:"La contraseña se ha actualizado correctamente!"});
    } else {
        res.status(401).send({status:"Error", message:"No se pudo actualizar la contraseña!"});
    }    
});

//GitHub
router.get("/github", passport.authenticate("github", {scope:["user:email"]}), async (req, res) => {});

router.get("/githubcallback", passport.authenticate("github", {failureRedirect:"/login"}), async (req, res) => {
    req.session.user = req.user;
    req.session.loggedIn = true;
    res.redirect("/profile");
});

//Current
router.get("/current", passportCall("jwt"), authorization("user"), (req, res) => {
  res.send({status:"OK", payload:req.user});
});

export default router;