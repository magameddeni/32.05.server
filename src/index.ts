import express from "express"
import { config } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import userRoutes from "./routes/userRoutes.js"

config()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
)

app.use("/api", userRoutes)
;(async () => {
  try {
    app.listen(5000, () => {
      console.log("Backend server is running! On port")
    })
  } catch (error) {
    console.log(error)
  }
})()
