/*
export function someGetter (state) {
}
*/


export function getIsLoading(state) {
    return state.isLoading
}

export function getConversations(state) {
    return state.conversations
}

export function getConversationsByID(state) {
    return (_id) => {
        return state.conversations.filter(c => c._id === _id)[0]
    }
}

export function getConversationsByIdAttr(state) {
    return (_id, key) => state.conversations.filter(c => c._id === _id)[0][key]
}