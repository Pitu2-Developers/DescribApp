// import something here
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client'

// const SOCKET_URL = 'http://localhost:7001'
// const SOCKET_URL = 'http://172.20.10.4:7001'
const SOCKET_URL = 'http://10.42.0.1:7001'

// leave the export, even if you don't use it
export default ({ app, store, router, Vue }) => {
  // something to do
  Vue.use(VueSocketio, socketio(SOCKET_URL), store)
}
