import { Context } from 'koa'
// import { IAdjusterModel, IAdjusterDocument } from '../models/adjuster/adjuster.interface';
import autobind from 'autobind-decorator'
// import { AdjusterHelpers } from '../helpers/adjuster.helpers'
import { Inject, Container } from 'typescript-ioc';
import { IClientModel, IClientDocument } from '../models/client/client.interface';
import { ClientHelpers } from '../helpers/client.helpers';
import { IAdjusterModel, IAdjusterDocument } from '../models/adjuster/adjuster.interface';
import { AdjusterHelpers } from '../helpers/adjuster.helpers';
import { ConversationHelpers } from '../helpers/conversation.helpers';
import { AccidentHelpers } from '../helpers/accident.helpers';


class ApiControllers {
    @Inject private adjusterHelpers: AdjusterHelpers
    @Inject private clientHelpers: ClientHelpers
    @Inject private conversationHelpers: ConversationHelpers
    @Inject private accidentHelpers: AccidentHelpers

    constructor() { }

    @autobind
    public async clientSignUp(ctx: Context) {
        try {

            const data: IClientModel = ctx.request.body as IClientModel
            const user: IClientDocument = await this.clientHelpers.createUser(data)
            console.log(user);

            ctx.body = 'CREATED'

        } catch (error) {
            console.log(error);
            ctx.throw(500)
        }
    }
    @autobind
    public async adjusterSignUp(ctx: Context) {
        console.log(ctx.request.body);

        try {
            const data: IAdjusterModel = ctx.request.body as IAdjusterModel
            const user: IAdjusterDocument = await this.adjusterHelpers.createAdjuster(data)
            console.log(user);

            ctx.body = 'CREATED'
        } catch (error) {
            console.error(error);
            ctx.throw(500)
        }
    }

    @autobind
    public async getConversations(ctx: Context) {
        const { _id, role } = ctx.state
        try {
            ctx.body = await this.conversationHelpers.getConversationsById(_id, role)
        } catch (error) {
            console.error(error);
            ctx.throw(500)
        }
    }

    @autobind
    public async setAccidentServices(ctx: Context) {
        try {
            console.log(`ACCIDENT ID: ${ctx.params.id} `);
            console.log(ctx.request.body);
            await this.accidentHelpers.updateAccidentServices(ctx.params.id, ctx.request.body.services)
            ctx.status = 200
        } catch (error) {
            console.log(error);

            ctx.throw(500)
        }
    }
}

export default Container.get(ApiControllers) as ApiControllers
