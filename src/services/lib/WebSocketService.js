import Stomp from 'stompjs'
import { WS } from 'src/remotes'

export default class WebSocketService {
  constructor () {
    this.isConnected = false

    // key -> { server: {id, unsubscribe}, clients: {id, Subscriber}}
    this.connections = {}

    this.stompClient = Stomp.client(WS.url)
    this.stompClient.debug = null // disable embedded logger

    this.stompClient.connect(WS.login, WS.password, () => {
      this.isConnected = true
    })
  }

  subscribe (exchange, routeKey, callback) {
    const key = `${exchange}/${routeKey}`

    if (!this.connections[key]) {
      const connectionDescription = this.stompClient.subscribe(`/exchange/${key}`, (message) => {
        const subscribers = this.connections[key].client
        Object.values(subscribers).forEach(subscriber => subscriber.onMessage(message.body))
      })

      this.connections[key] = {
        server: connectionDescription
      }
    }

    const subscribers = this.connections[key].client || {}

    const id = this.random()
    const subscriber = new Subscriber(id, callback, () => this.unsubscribe(exchange, routeKey, id))

    this.connections[key].client = {
      ...subscribers,
      [subscriber.id]: subscriber
    }
    return subscriber
  }

  unsubscribe (exchange, routeKey, id) {
    const key = `${exchange}/${routeKey}`
    if (this.connections[key]) {
      delete this.connections[key].client[id]

      if (Object.keys(this.connections[key].client).length === 0) {
        this.connections[key].server.unsubscribe()
        delete this.connections[key]
      }
    }
  }

  random () {
    return Math.random().toString(36).substr(2, 9)
  }
}

class Subscriber {
  constructor (id, messageCallback, unsubscribeFn) {
    this.id = id
    this.messageCallback = messageCallback
    this.unsubscribeFn = unsubscribeFn
  }

  onMessage (message) {
    this.messageCallback(message)
  }

  unsubscribe () {
    this.unsubscribeFn(this.id)
  }
}
