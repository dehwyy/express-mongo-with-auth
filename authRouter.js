import Router from "express"
import authController from "./authController.js";
import {check} from "express-validator";
import authMdwr from "./middleware/authMiddleware.js"
import roleMdwr from "./middleware/roleMiddleware.js"
const router = new Router()


router.post("/reg", [
    check("username", "username cannot be empty").notEmpty(),
    check("password", "pass is odd").isLength({min: 4, max: 12})
],  authController.reg)
router.post("/login", authController.login)
router.get("/users", roleMdwr(["ADMIN"]), authController.getUsers)

export default router