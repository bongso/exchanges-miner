import {store} from './store'
import {bithumbApiTicker, BTC} from 'bit-stream'

async function get() {
  console.log('call')
  store.dispatch(bithumbApiTicker(BTC))
}

setInterval(get, 1000)
