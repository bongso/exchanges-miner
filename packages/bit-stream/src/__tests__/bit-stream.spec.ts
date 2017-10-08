import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {bitStreamReducer, BitStreamState} from '../modules/api/index'
import {OrderBook, Ticker, Transaction} from '../model/bithumb'
import {bithumbApiOrderBook, bithumbApiTicker, bithumbApiTransactions} from '../modules/api/bithumb/index'
import {BTC} from '../index'

describe('bithumb api', () => {
  const store = createStore<RootState>(
    combineReducers({api: bitStreamReducer}),
    applyMiddleware(thunk)
  )
  it('ticker', async (done) => {
    await store.dispatch(bithumbApiTicker(BTC))
    if (store.getState().api.bithumb.tickers[0] instanceof Ticker) {
      done()
    }
  })
  it('orderBook', async (done) => {
    await store.dispatch(bithumbApiOrderBook(BTC, {count: 1}))

    if (store.getState().api.bithumb.orderBooks[0] instanceof OrderBook) {
      done()
    }
  })
  it('recentTransaction', async (done) => {
    await store.dispatch(bithumbApiTransactions(BTC, {count: 1}))

    if (store.getState().api.bithumb.transactions[0] instanceof Transaction) {
      done()
    }
  })
})

interface RootState {
  api: BitStreamState
}

