import * as request from 'supertest';
import app from '../../server'
import { Types } from 'mongoose'
import { connect } from '../../models';
import { IClientModel } from '../../models/client/client.interface';
import { IAdjusterModel } from '../../models/adjuster/adjuster.interface';
import { IPolicyModel, IPolicyDocument } from '../../models/policy/policy.interface';
import * as moment from 'moment'
import Policy from '../../models/policy/policy.model'

describe('/api/* [TEST]', () => {
    beforeAll(() => {
        connect()
    })

    it.skip('should create a user POST /auth/signup ', async (done: Function) => {

        const user: IClientModel = {
            firstName: 'Vicky',
            lastName: 'Molina',
            email: 'test1@gmail.com',
            password: '12345678',
            gender: 'F',
            address: {
                col: 'Zona Centro',
                municipality: 'Ciudad Valles',
                postalCode: 7900,
                state: 'SLP',
                street: {
                    name: 'Priv. Pedro Antonio Santos',
                    noExt: '48',
                    noInt: 'A'
                }
            },
            rfc: 'testRFC',
            nationality: 1,
            maritalStatus: 1,
            contact: {
                mobile: '4811095288',
            },
            drivers: [
                {
                    firstName: 'Nacho',
                    lastName: 'Montaner',
                    age: 21,
                    gender: 'M'
                }
            ],
            adjuster: '5baf909d2ee96d1438e41e38',
            vehicle: {
                vehicleType: 1,
                model: 'Y Model',
                doors: 2,
                cylinders: 6,
                transmission: 2,
                isElectric: true,
                isEquipped: false,
                hasAir: true,
                noSerie: 'S Model',
                noEngine: '12342g',
                plate: '1291jaa'


            },
            policy: ''

        }

        const policy: IPolicyDocument = new Policy({
            expiration: moment().add('1', 'month').toDate(),
            folio: '1256-6526'
        })

        try {
            await policy.save().then(res => res)
            user.policy = policy._id
            const response = await request(app.getApp().callback())
                .post('/api/signup').send(user)
            expect(response.status).toBe(200)
            done()

        } catch (error) {
            done(error)
        }








    })
    it('should create a adjuster ', async (done) => {
        const data: IAdjusterModel = {
            email: 'adjuster@gmail.com',
            firstName: 'Eduardo',
            lastName: 'Montaner',
            gender: 'M',
            password: '12345678',
            contact: {
                mobile: '48112345678'
            }
        }

        const response = await request(app.getApp().callback())
            .post('/api/adjuster/signup').send(data)



        expect(response.status).toBe(200)
        done()
    })



})