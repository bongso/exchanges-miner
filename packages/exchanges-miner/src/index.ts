import {store} from './store'
import {bithumbApiTicker, coinoneApiTicker, BTC} from 'bit-stream'

let count = 0

async function get() {
  store.dispatch(coinoneApiTicker())
  store.dispatch(bithumbApiTicker(BTC))
  count++
}

process.on('SIGINT', () => {
  console.log(`\nloop count: ${count}`)
  
  process.exit(0)
});

console.log(`start at: ${new Date().toISOString()}`)

setInterval(get, 3000)
