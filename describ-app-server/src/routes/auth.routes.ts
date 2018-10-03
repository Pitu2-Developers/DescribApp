// import { authController, signUpController } from "../controllers/auth.controller";
import AuthControllers from '../controllers/auth.controller'
import * as KoaRouter from 'koa-router'



const router = new KoaRouter({ prefix: '/auth' })
router.post('/signin', AuthControllers.signIn)


export default router