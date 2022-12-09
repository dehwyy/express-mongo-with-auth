import User from "./models/User.js";
import Role from "./models/Role.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {validationResult} from "express-validator";
import {config} from "./config.js";

const generateToken = (id, roles) => {
    const payload = {id, roles}
    return jwt.sign(payload, config.secretKey,{expiresIn: '24h'})
}

class authController {
    async reg(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "several erros in reg", errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "user already exists"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: "USER WAS SUCCESSFULLY CREATED"})
        } catch(e) {
            console.log(e)
            res.status(400).end("ERROR REG")
        }
    }
    async login(req, res) {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (!user) {
            return res.status(400).json({message: "invalid username"})
        }
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({message: "invalid password"})
        }
        const token = generateToken(user._id, user.roles)
        return res.json({token})
    }
    async getUsers(req, res) {
        try {
            const users = await User.find()
            return res.json(users)
        } catch(e) {
            console.log(e)
            res.end("ERROR IN GETTING USERS")
        }
    }
}

export default new authController();