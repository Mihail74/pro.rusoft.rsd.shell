import WebSocketService from './lib/WebSocketService'
import TransactionSender from './lib/TransactionSender'
import HdWalletUtils from './lib/HdWalletUtils'

export default (applicationContext) => {
  return {
    webSocketService: new WebSocketService(applicationContext),
    transactionSender: new TransactionSender(applicationContext),
    hdWalletUtils: new HdWalletUtils(applicationContext)
  }
}
