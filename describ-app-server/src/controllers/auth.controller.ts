import { Context } from "koa";
import { ClientHelpers } from "../helpers/client.helpers";
import { IClientDocument, IClientModel } from "../models/client/client.interface";
import { SecurityService } from "../security";
import { Container, Inject } from 'typescript-ioc'
import autobind from 'autobind-decorator'
import { UserHelpers } from "../helpers/user.helpers";
import { AuthResponse, Credentials } from "../types";


class AuthController {
    @Inject private helpers: ClientHelpers
    @Inject private securityService: SecurityService
    @Inject private _helpers: UserHelpers

    constructor() { }

    ///
    @autobind
    public async signIn(ctx: Context) {
        console.log("SING IN");

        try {
            const data: Credentials = ctx.request.body as Credentials
            const authResponse: AuthResponse = await this._helpers.authenticate(data)
            // console.log(authResponse);

            ctx.body = authResponse
        } catch (error) {
            ctx.status = error.status || 500
            ctx.body = error
            // ctx.body = error
        }

    }

    ///

}


//
export default Container.get(AuthController) as AuthController

