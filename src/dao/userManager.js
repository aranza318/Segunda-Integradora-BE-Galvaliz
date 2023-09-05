import { userModel } from "./models/user.model.js";

class UserManager {
    async addUser(user) {
        try {
            await userModel.create(user)
            console.log("User added!");
    
            return true;
        } catch (error) {
            return false;
        }
    }

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
    
    async getUserByID(id) {
        try {
            const userID= await userModel.findOne([{_id:id}]) || null;
             if(userID){
                console.log(userID);
                return user
             }
            
            return true;
        } catch (error) {
            return false;
        }
      
    }
    logoutUser = async (req) => {
        try {
            req.session.destroy();
            return { status: "success", message: "Sesión cerrada" };
        } catch (error) {
            console.log(error);
            return { status: "error", error: "Error interno del servidor" };
        }
    };
    
    findUserById = async (idRef) => {
        try {
            const user = await userModel.findById(idRef);
            return user? user : {};
        } catch(error) {
            console.log(error);
        }
    }
};
    

export default UserManager;