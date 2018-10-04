import $axios from 'axios'
import { Notify } from 'quasar'
// const AUTH_URL = "http://localhost:7000/auth"
// const API_URL = "http://localhost:7000/api"
// const AUTH_URL = "http://172.20.10.4:7000/auth"
// const API_URL = "http://172.20.10.4:7000/api"

const AUTH_URL = "http://10.42.0.1:7000/auth"
const API_URL = "http://10.42.0.1:7000/api"


import { ALERT, LOGIN, LOGOUT, RESET_STATE } from './mutationTypes'


export async function startConversation({ commit }, { $router, _id, adjusterID, accidentID, services }) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    try {
        const response = await $axios.put(`${API_URL}/accident/${accidentID}`, { services }, config)
        console.log(response);

        $router.push('/chat')
        commit(ALERT.SUCCESS)

    } catch (error) {
    }
}


export function logout({ commit }, { $router, $socket, _id }) {
    commit(LOGOUT.SUCCESS)
    commit(RESET_STATE)
    $router.push('/')
    $socket.emit('logout', _id)
}




export async function signIn({ commit }, { data, $router, $socket }) {
    const config = {
        method: 'post',
        url: `${AUTH_URL}/signin`,
        data
    }

    commit(LOGIN.PENDING)
    try {
        const data = (await $axios(config)).data
        if (data.user.role === 'client')
            $router.push('/dashboard/client')
        else if (data.user.role === 'adjuster') {
            $router.push('/dashboard/adjuster')
        }


        commit(LOGIN.SUCCESS, data)
        $socket.emit('login', data.user._id)
    } catch (error) {
        commit(LOGIN.FAILED)
        const message = error.response.data.message || 'Server Error :('
        Notify.create({ message, type: 'negative', position: 'bottom-right' })

    }


}