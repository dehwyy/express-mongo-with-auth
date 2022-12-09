import jwt from "jsonwebtoken";
import {config} from "../config.js";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return res.status(400).json("not authed")
        res.user = jwt.verify(token, config.secretKey)
        next()
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: "ERROR IN AUTHMIDDLEWARE"})
    }
}
export default authMiddleware
