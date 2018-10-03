import { REQUEST_CONVERSATIONS } from './mutation-types'
export default {
    [REQUEST_CONVERSATIONS.SUCCESS](state, data) {
        setTimeout(() => state.isLoading = false, 2000)
        state.conversations = data

    },
    [REQUEST_CONVERSATIONS.FAILED](state) {

    },
    [REQUEST_CONVERSATIONS.PENDING](state) {
        state.isLoading = true
    }




}