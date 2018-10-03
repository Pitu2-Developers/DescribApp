import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'
import chat from './chat'

Vue.use(Vuex)


/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export const defaultState = {
  user: undefined,
  isAlert: false,
  isLoading: false,
  isChat: false,
  notifications: []
}

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: defaultState,
    modules: {
      chat
    },
    actions,
    mutations,
    getters
  })

  return Store
}
