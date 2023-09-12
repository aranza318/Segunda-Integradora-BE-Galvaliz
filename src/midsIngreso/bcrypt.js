import bcrypt from "bcrypt"

//Crea el hash
export function createHash(frase) {
    return bcrypt.hashSync(frase, bcrypt.genSaltSync(10))
}

//Valida la contraseña
export function isValidPassword(recibida,almacenada){
    return bcrypt.compareSync(recibida,almacenada)
}

