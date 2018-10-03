export function getNotifications(state) {
    if (state.user)
        return state.notifications
}

export function getUserAttr(state) {
    if (state.user)
        return (key) => state.user[key]
}

export function getRole(state) {
    if (state.user)
        return state.user.role
}

export function getIsAlert(state) {
    return state.isAlert
}

export function getAdjusterAttr(state) {
    if (state.user)
        return key => state.user.adjuster[key]
}
export function getGender(state) {
    if (state.user)
        return state.user.gender === 'M' ? 'Hombre' : 'Femenino';
}
export function getFullName(state) {
    if (state.user)
        return state.user.fullname
}

export function getAvatar(state) {
    if (state.user)
        return state.user.avatar
}

export function getID(state) {
    if (state.user)
        return state.user._id
}

export function getAdjusterID(state) {
    if (state.user && state.user.role === 'client')
        return state.user.adjuster._id

}

export function getIsLoading(state) {
    return state.isLoading
}


export function getIsChat(state) {

    return state.isChat
}