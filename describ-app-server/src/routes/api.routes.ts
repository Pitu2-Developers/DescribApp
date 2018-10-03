import ApiControllers from "../controllers/api.controller";
import * as KoaRouter from 'koa-router'
import { isAuth } from "../middlewares/auth.middleware";


const router = new KoaRouter({ prefix: '/api' })
// router.post('/adjuster/signup', ApiControllers.adjusterSignUp)
router.post('/signup', ApiControllers.clientSignUp)
router.post('/adjuster/signup', ApiControllers.adjusterSignUp)
router.get('/conversations', isAuth, ApiControllers.getConversations)
router.put('/accident/:id', ApiControllers.setAccidentServices)

export default router