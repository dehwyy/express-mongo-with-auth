import jwt from "jsonwebtoken";
import {config} from "../config.js";

const roleMiddleware = (roles) => (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return res.status(400).json({message: "ERROR IN ROLE MIDDLEWARE"})
        const decodedToken = jwt.verify(token, config.secretKey)
        const {roles: userRoles} = decodedToken
        let hasRole = false
        userRoles.forEach(userRole => {
            if (roles.includes(userRole)) {
                hasRole = true
            }
        })
        if (!hasRole) return res.status(400).json({message: "access denied"})
        res.user = decodedToken
        next()
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: "ERROR RAISED IN ROLEMDWR"})
    }
}
export default roleMiddleware;