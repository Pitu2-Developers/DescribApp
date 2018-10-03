import { createHandyClient } from 'handy-redis'

const client = createHandyClient()

const HASH_NAME = 'users-connected'

export class RedisHandler {
    constructor() { }

    public async setSocketID(_id: string, socketID: string) {
        return await client.hset(HASH_NAME, _id, socketID)
    }

    public async getSocketID(_id: string) {
        return await client.hget(HASH_NAME, _id)
    }

    public async deleteSocketID(_id: string) {
        return await client.hdel(HASH_NAME, _id)
    }
    public async isConnected(_id: string): Promise<boolean> {
        try {
            const isConnected = await client.hget(HASH_NAME, _id)
            return !isConnected ? false : true
        } catch (error) {
            return false
        }
    }
}

// export async function setSocketID(socketID: string, _id: string) {
//     return await client.hset(HASH_NAME, _id, socketID)
// }

// export async function getSocketID(_id: string) {
//     return await client.hget(HASH_NAME, _id)
// }

// export async function deleteSocketID(_id: string) {
//     return await client.hdel(HASH_NAME, _id)
// }