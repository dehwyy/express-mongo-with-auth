import express from "express"
import mongoose from "mongoose";
import router from "./authRouter.js";
import Role from "./models/Role.js";

const PORT = 727
const db_url = `mongodb+srv://user:user@cluster0.0ukhtyy.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', true);

const app = express()

app.use(express.json())
app.use("/auth", router)

const start = async () => {
    try {
        await mongoose.connect(db_url)
        app.listen(PORT, () => console.log("server started on " + PORT))
    } catch (e) {
        console.log(e)
    }
}
start().then(() => {
    console.log("SUCCESS-NONE")
})