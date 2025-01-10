import { Hono } from 'hono'
import { cors } from 'hono/cors'

import userRoute from "./routes/userRoute";

const app = new Hono()
app.use(cors())

app.route("/user", userRoute);

export default app
