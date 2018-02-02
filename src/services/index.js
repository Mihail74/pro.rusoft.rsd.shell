import WebSocketService from './lib/WebSocketService'

export default (applicationContext) => {
  return {
    webSocketService: new WebSocketService(applicationContext)
  }
}
