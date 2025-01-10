import { Hono } from "hono"

const userRoute = new Hono();

const users = [
    {
        regNo: 12308018,
        password: "ashwin@2005"
    },
    {
        regNo: 12308019,
        password: "pooja@2005"
    }
]

userRoute.post("/login",  async (c) => {
    // check first user and password correct
    const {regNo, password} = await c.req.json();
    const isUser = users.reduce(user => {
        return user.regNo == regNo & user.password == password
    });
    console.log(isUser);
    c.json({mes: "you have logged in"})
})

export default userRoute;