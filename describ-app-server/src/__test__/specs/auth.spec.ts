import * as request from 'supertest';
import app from '../../server'
import { connect } from '../../models/'
import { IClientModel } from '../../models/client/client.interface';
import { Credentials } from '../../types';


describe(' /auth/* [TEST]', () => {

    beforeAll(() => {
        connect()
    })


    it.skip('should POST /auth/signin response 200', async (done: Function) => {
        const data: Credentials = {
            email: 'test@gmail.com',
            password: '12345678'
        }
        const response = await request(app.getApp().callback()).post('/auth/signin')
            .send(data)
        expect(response.status).toBe(200)
        done()
    })





})