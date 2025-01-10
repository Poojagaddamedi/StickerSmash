import { Hono } from "hono"

const userRoute = new Hono();

const users = [
    {
        regNo: "12308018",
        password: "ashwin@2005"
    },
    {
        regNo: "12308019",
        password: "pooja@2005"
    }
];

 
userRoute.post("/login", async (c) => {
    const { regNo, password } = await c.req.json();
    
    const user = users.find(user => user.regNo === regNo && user.password === password);
    
    if (user) {
        return c.json({ mes: "you have logged in", user });
    } else {
        return c.json({ mes: "invalid credentials" }, 401);
    }
});


userRoute.post("reg", async (c) => {
    const { regNo, password } = await c.req.json();
    users.push({regNo, password});
    return c.json({ mes: "user registered" });
});

export default userRoute;