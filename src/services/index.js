import WebSocketService from './lib/WebSocketService'
import TransactionSender from './lib/TransactionSender'

export default (applicationContext) => {
  return {
    webSocketService: new WebSocketService(applicationContext),
    transactionSender: new TransactionSender(applicationContext)
  }
}
