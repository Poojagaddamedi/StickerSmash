import { Hono } from 'hono'
import { cors } from 'hono/cors'
import * as dotenv from 'dotenv';


import userRoute from "./routes/userRoute";

dotenv.config();

const app = new Hono()
app.use(cors());

app.route("/user", userRoute);

export default app
