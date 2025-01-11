import {getCookie} from 'hono/cookie'

const userMiddleware = (c, next) => {
    console.log("1st reacheed middleware");
    const token = getCookie(c, "token");
    console.log(token);
    
    if(token === undefined || token === ""){
        return c.json({mes: "Unauthorized"});
    }
    return next();
}

export default userMiddleware   ;  