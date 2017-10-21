import {store} from './store'
import {bithumbApiTicker, BTC} from 'bit-stream'
import {coinoneApiTicker} from '../../bit-stream/src/modules/api/coinone/index'

let count = 0

async function get() {
  store.dispatch(coinoneApiTicker())
  count++
}

process.on('SIGINT', () => {
  console.log(`\nloop count: ${count}`)
  
  process.exit(0)
});

console.log(`start at: ${new Date().toISOString()}`)

setInterval(get, 1000)
