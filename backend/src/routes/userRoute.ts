import { Hono } from "hono"

const userRoute = new Hono();

import supabase from "../database/db";


 
userRoute.post("/login", async (c) => {
    const { regNo, password } = await c.req.json();
    
    const {data, error} = await supabase
                            .from("user")
                            .select("*")
                            .eq("regNo", regNo)
                            .eq("password", password);
    
    if (data?.length > 0) {
        return c.json({ mes: "you have logged in", user: data, error });
    } else {
        return c.json({ mes: "invalid credentials" }, 401);
    }
});


userRoute.post("/reg", async (c) => {
    const { regNo, password } = await c.req.json();
    const {data: user, error: userError} = await supabase
                            .from("user")
                            .select("*")
                            .eq("regNo", regNo);
    console.log(user);
    if (user?.length > 0) {
        return c.json({ mes: "user already exists", userError }, 401);
    }
    const {data: userData, error: userDataError} = await supabase
                            .from("user")
                            .insert({regNo, password});
    if (userDataError) {
        return c.json({ mes: "user already exists", userDataError }, 401);
    }
    return c.json({ mes: "user registered" });
});


export default userRoute;