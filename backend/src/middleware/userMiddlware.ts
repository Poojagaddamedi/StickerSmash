import {getCookie} from 'hono/cookie'
import { Context, Next } from 'hono';

const userMiddleware = (c: Context, next: Next) => {
    console.log("1st reacheed middleware");
    const token = getCookie(c, "token");
    console.log(token);
    
    if(token === undefined || token === ""){
        return c.json({mes: "Unauthorized"});
    }
    return next();
}

export default userMiddleware   ;  