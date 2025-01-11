import { Hono } from "hono"

const userRoute = new Hono();

import supabase from "../database/db";
import userMiddleware from "../middleware/userMiddlware";
import { setCookie } from "hono/cookie";


 
userRoute.post("/login", async (c) => {
    const { regNo, password } = await c.req.json();

    const {data, error} = await supabase
                            .from("user")
                            .select("*")
                            .eq("regNo", regNo)
                            .eq("password", password);

    if (data?.length > 0) {
        setCookie(c, "token", regNo);
        return c.json({ mes: "you have logged in", user: data, error });
    } else {
        return c.json({ mes: "invalid credentials" }, 401);
    }
});


userRoute.post("/reg", async (c) => {
    const { regNo, password, skills } = await c.req.json();
    const {data: user, error: userError} = await supabase
                            .from("user")
                            .select("*")
                            .eq("regNo", regNo);
    
    if (user?.length > 0) {
        return c.json({ mes: "user already exists", userError }, 401);
    }
    const {data: userData} = await supabase
                            .from("user")
                            .insert({regNo, password, skills});

    return c.json({ mes: "user registered" });
});

userRoute.post("/suggestions", userMiddleware, async (c) => {
    console.log("2nd reacheed actual route");
    
    const { skills } = await c.req.json();
    const { data, error } = await supabase
                            .from("user")
                            .select("*")
                            .contains("skills", skills); 
    console.log(error);
    return c.json({ mes: "suggestions", data, error });
})

userRoute.post("/friend-req", userMiddleware, async (c) => {
    const {regNo, friendRegNo} = await c.req.json();
    console.log(regNo);
    const {data, error} = await supabase
                                .from("request")
                                .insert({requestRegNo: regNo, recRegNo: friendRegNo});
    return c.json({ mes: "friend request sent", data, error });
})

userRoute.get("/friend-req/:regNo", userMiddleware, async (c) => {
    const {regNo} = c.req.param();
    const {data, error} = await supabase
                                .from("request")
                                .select("*")
                                .eq("recRegNo", regNo);
    return c.json({ mes: data});
})

userRoute.put("/accept-friend-req", userMiddleware, async (c) => {
    const {regNo, friendRegNo} = await c.req.json();
    const {data, error} = await supabase
                                .from("request")
                                .update({status: "accepted"})
                                .eq("requestRegNo", friendRegNo)
                                .eq("recRegNo", regNo);
    return c.json({ mes: "friend request accepted", data, error });
});


userRoute.get("/logout", async (c) => {
    setCookie(c, "token", "");
    return c.json({ mes: "logged out" });
})

export default userRoute;
