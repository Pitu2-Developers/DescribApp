import { Context, } from "koa";
import { SecurityService } from '../security/'
const { decodeToken } = new SecurityService()

export async function isAuth(ctx: Context, next: Function) {
    const token = ctx.request.headers.authorization.split(' ')[1]

    try {
        const payload = await decodeToken(token)
        ctx.state = payload
        await next()

    } catch (error) {
        ctx.status = 401
        ctx.body = "Not authorized"
        // await next(error)
    }

    // console.log(ctx.request.headers);
}