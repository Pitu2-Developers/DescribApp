import ApiRouter from './api.routes'
import AuthRouter from './auth.routes'
import * as KoaRouter from 'koa-router'
import { Context } from 'koa';
const KoaSend = require('koa-send')
import * as path from 'path'


const routers: any[] = [
    ApiRouter,
    AuthRouter
]


class Router extends KoaRouter {
    constructor(routers: KoaRouter[]) {
        super()
        this.init(routers)
        this.get('/', async (ctx: Context) => {
            const indexPath = path.join(__dirname, '..', 'public')
            await KoaSend(ctx, ctx.path, { root: indexPath + '/index.html' })
        })

    }
    private addRouter(router: KoaRouter): void {
        this.use(router.routes())
        this.use(router.allowedMethods())
    }
    private init(routers: KoaRouter[]): void {
        routers.forEach(router => this.addRouter(router))
    }

}





export default new Router(routers)
