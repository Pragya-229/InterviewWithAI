const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

const defaultAllowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://interview-with-ai-theta.vercel.app",
    "https://interviewai-brn4.onrender.com"
]

const envAllowedOrigins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)

const allowedOrigins = new Set([
    ...defaultAllowedOrigins,
    ...envAllowedOrigins,
    process.env.FRONTEND_URL
].filter(Boolean))

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin(origin, callback) {
        // Allow non-browser clients like Postman that do not send an Origin header.
        if (!origin) {
            return callback(null, true)
        }

        return callback(null, allowedOrigins.has(origin))
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app