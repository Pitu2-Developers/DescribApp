import { LOGIN, RESET_STATE, LOGOUT, ALERT, CHAT_ROOM, NOTIFICATION } from './mutationTypes'
import { defaultState } from './'

export default {
    [NOTIFICATION.ADD](state, notification) {
        state.notifications.push(notification)
    },
    [CHAT_ROOM](state) {
        state.isChat = !state.isChat
    },
    [RESET_STATE](state) {
        state = defaultState
    },
    [ALERT.FAILED](state) {
        state.isAlert = false
    },
    [ALERT.SUCCESS](state) {
        state.isAlert = !state.isAlert
    },
    [LOGIN.PENDING](state) {
        console.log("PENDING");
    },
    [LOGIN.SUCCESS](state, { user, token }) {
        console.log("SUCCESS");
        console.log(token);
        localStorage.setItem('token', token)
        state.user = user
        state.notifications = user.notifications
        state.isLoggedIn = true
    },
    [LOGIN.FAILED](state) {
        console.log("FAILED");
        state.isLoggedIn = false

    },
    [LOGOUT.SUCCESS](state) {
        state.isLoggedIn = false
        state.user = undefined
        localStorage.removeItem('token')
    }
    // [LAYOUT.SET](state, layout) {
    //     state.layout = layout
    // }


}