import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT
export const COOKIE_SECRET = process.env.COOKIE_SECRET
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR
export const JWT_SECRET = process.env.JWT_SECRET
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL 
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
