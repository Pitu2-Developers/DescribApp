// import something here
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client'

// const SOCKET_URL = 'http://localhost:7001'
const SOCKET_URL = 'http://192.168.1.68:7001'

// leave the export, even if you don't use it
export default ({ app, store, router, Vue }) => {
  // something to do
  Vue.use(VueSocketio, socketio(SOCKET_URL), store)
}
