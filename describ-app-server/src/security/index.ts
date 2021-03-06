import { decode, encode } from 'jwt-simple'
import * as moment from 'moment'
import { ID } from '../types/'
import { SECRET_TOKEN } from '../config';


export class SecurityService {
    constructor() { }



    public decodeToken(token: string): Promise<string> {

        const promise: Promise<any> = new Promise((resolve) => {
            try {
                const payload: any = decode(token, SECRET_TOKEN)

                if (payload.exp <= moment().unix())
                    throw { status: 500, message: 'Token has expired' }
                return resolve({ _id: payload.sub, role: payload.role })

            } catch (error) {
                throw { status: 500, message: 'Server error', error }
            }
        })

        return promise

    }


    public generateToken(sub: ID, role: string): string {
        const payload: Object = {
            sub,
            role,
            ait: moment().unix(),
            exp: moment().add(1, 'days').unix()
        }

        return encode(payload, SECRET_TOKEN)
    }


    public isAuth(token: string): boolean {
        try {
            const payload: any = decode(token, SECRET_TOKEN)
            if (payload.exp <= moment().unix())
                return false
            return true
        } catch (error) {
            return false
        }
    }

}

// export function decodeToken(token: string): Promise<string> {

//     const promise: Promise<any> = new Promise((resolve, reject) => {
//         try {
//             const payload: any = decode(token, SECRET_TOKEN)

//             if (payload.exp <= moment().unix())
//                 throw { status: 500, message: 'Token has expired' }
//             return resolve(payload.sub)

//         } catch (error) {
//             throw { status: 500, message: 'Server error', error }
//         }
//     })

//     return promise
// }





// export function generateToken(sub: ID): string {
//     const payload: Object = {
//         sub,
//         ait: moment().unix(),
//         exp: moment().add(1, 'days').unix()
//     }

//     return encode(payload, SECRET_TOKEN)
// }


// export function isAuth(token: string): boolean {
//     try {
//         const payload: any = decode(token, SECRET_TOKEN)
//         return true
//     } catch (error) {
//         return false
//     }
// }