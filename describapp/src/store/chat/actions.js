import $axios from 'axios'
import { REQUEST_CONVERSATIONS } from './mutation-types';
// const AUTH_URL = "http://localhost:7000/auth"
// const API_URL = "http://localhost:7000/api"
// const AUTH_URL = "http://172.20.10.4:7000/auth"
// const API_URL = "http://172.20.10.4:7000/api"

const AUTH_URL = "http://10.42.0.1:7000/auth"
const API_URL = "http://10.42.0.1:7000/api"



export async function getConversations({ commit }) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    commit(REQUEST_CONVERSATIONS.PENDING)
    try {
        const response = await $axios.get(`${API_URL}/conversations`, config)
        console.log(response);
        console.log("GER CONVERSATIONS");

        commit(REQUEST_CONVERSATIONS.SUCCESS, response.data)
    } catch (error) {
        commit(REQUEST_CONVERSATIONS.FAILED)
    }
}

