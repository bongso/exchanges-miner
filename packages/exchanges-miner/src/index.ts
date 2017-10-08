import {store} from './store'
import {bithumbApiTicker, BTC} from 'bit-stream'

async function get() {
  store.dispatch(bithumbApiTicker(BTC))
}

setInterval(get, 1000)
