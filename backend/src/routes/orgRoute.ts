import { Hono } from "hono";
import supabase from "../database/db";

const orgRoute = new Hono();

orgRoute.post("/create-post", async(c) => {
    const {title, description, date, end_date} = await c.req.json();
    const {data, error} = await supabase
                                .from("post")
                                .insert({title, description, date, end_date});
    return c.json({ mes: "post created", data, error });
});

orgRoute.get("/get-post", async(c) => {
    const {data, error} = await supabase
                                .from("post")
                                .select("*")
                                .order("date", { ascending: false });
                                
    return c.json({ mes: "post fetched", data, error });
});


export default orgRoute;
