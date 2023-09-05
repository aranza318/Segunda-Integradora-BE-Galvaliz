import { userModel } from "./models/user.model.js";

class UserManager {
    //Agrega un nuevo usuario
    async addUser(user) {
        try {
            await userModel.create(user)
            console.log("User added!");
    
            return true;
        } catch (error) {
            return false;
        }
    }
    //Login
    async login(user, pass, req) {
        try {
            const userLogged =  (await userModel.findOne({ email: user, password: pass })) || null;
            
            if (userLogged) {
                if (userLogged) {
        const role =
          userLogged.email === "adminCoder@coder.com" ? "admin" : "usuario";

        req.session.user = {
          id: userLogged._id,
          email: userLogged.email,
          first_name: userLogged.first_name,
          last_name: userLogged.last_name,
          role: role,
        };

        console.log(
          "Valor de req.session.user después de la autenticación:",
          req.session.user
        );

        const userToReturn = userLogged;
        console.log("Valor de userToReturn:", JSON.stringify(userToReturn));
        return userToReturn;
      }
      console.log(
        "Valor de userLogged antes de devolver falso:",
        JSON.stringify(userLogged)
      );
      return false;
            }

            return false;
        } catch (error) {
            return false;
        }
    }
    //Consigue el usuario por su email
    async getUserByEmail(user) {
        try {
            const userRegisteredBefore= await userModel.findOne([{email:user}]) || null;
             if(userRegisteredBefore){
                console.log("Mail registrado anteriormente");
                return user
             }
            
            return true;
        } catch (error) {
            return false;
        }
      
    }
    
   
    
};
    

export default UserManager;