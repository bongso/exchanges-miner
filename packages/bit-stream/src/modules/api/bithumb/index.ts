import {GET, ReduxFetchAction} from 'redux-fetch'
import {createActions, SUCCESS} from '../../common'
import {
  BithumbOrderBook,
  BithumbPublicOrderBook,
  BithumbPublicTicker,
  BithumbTicker,
  BithumbTransaction,
  BithumbPublicRecentTransactions
} from '../../../model/bithumb'
import {Reducer} from 'redux'
import {Currency} from '../../../model/index'

const defaultState = {
  tickers:      [],
  orderBooks:   [],
  transactions: []
}

export const bithumb: Reducer<Bithumb> = (state = defaultState, action: ReduxFetchAction<any>) => {
  switch (action.type) {
    case TICKER[SUCCESS]: {
      const {payload} = action as ReduxFetchAction<BithumbResTicker>
      const ticker    = payload.data
      const tickers   = [new BithumbTicker(ticker)].concat(state.tickers)
      return {
        ...state,
        tickers
      }
    }

    case ORDER_BOOK[SUCCESS]: {
      const {payload}  = action as ReduxFetchAction<BithumbResOrderBook>
      const orderBooks = [new BithumbOrderBook(payload.data)].concat(state.orderBooks)
      return {
        ...state,
        orderBooks
      }
    }

    case TRANSACTIONS[SUCCESS]: {
      const {payload}         = action as ReduxFetchAction<BithumbResRecentTransactions>
      const latestTransaction = (state.transactions || [])[0]
      let data                = payload.data.map(transaction => new BithumbTransaction(transaction))

      if (latestTransaction) {
        const index = data.findIndex(tr => {
          return tr.transactionDate.diff(latestTransaction.transactionDate) === 0
        })
        data        = index !== -1
          ? data.slice(0, index)
          : data
      }

      const transactions = data.concat(state.transactions)

      return {
        ...state,
        transactions
      }
    }

    default:
      return state
  }
}

enum ActionTypes {
  Ticker       = 'bithumb ticker',
  OrderBook    = 'bithumb orderBook',
  Transactions = 'bithumb transactions',
}

const TICKER = createActions(ActionTypes.Ticker)
export function bithumbApiTicker(currency: Currency) {
  return GET(`${PUBLIC_API.Ticker}/${currency}`, TICKER)
}

const ORDER_BOOK = createActions(ActionTypes.OrderBook)
export function bithumbApiOrderBook(currency: Currency, query?: Partial<ReqParamOrderBook>) {
  return GET(`${PUBLIC_API.OrderBook}/${currency}`, ORDER_BOOK, {query})
}

const TRANSACTIONS                  = createActions(ActionTypes.Transactions)
export const bithumbApiTransactions = (currency: Currency, query?: Partial<ReqParamTransactions>) => {
  return GET(`${PUBLIC_API.Transactions}/${currency}`, TRANSACTIONS, {query})
}

const END_POINT        = 'https://api.bithumb.com'
const PUBLIC_END_POINT = `${END_POINT}/public`
const PUBLIC_API       = {
  Ticker:       `${PUBLIC_END_POINT}/ticker`,
  OrderBook:    `${PUBLIC_END_POINT}/orderbook`,
  Transactions: `${PUBLIC_END_POINT}/recent_transactions`,
}

export interface Bithumb {
  tickers: BithumbTicker[]
  orderBooks: BithumbOrderBook[]
  transactions: BithumbTransaction[]
}

type StatusCode = {
  0000: 'Success'
  5100: 'Bad Request'
  5200: 'Not Member'
  5300: 'Invalid Apikey'
  5302: 'Method Not Allowed'
  5400: 'Database Fail'
  5500: 'Invalid Parameter'
  5600: 'CUSTOM NOTICE (상황별 에러 메시지 출력)'
  5900: 'Unknown Error'
}

type BithumbResTicker = BithumbResponse<BithumbPublicTicker>
type BithumbResOrderBook = BithumbResponse<BithumbPublicOrderBook>
type BithumbResRecentTransactions = BithumbResponse<BithumbPublicRecentTransactions[]>

interface BithumbResponse<T> {
  status: keyof StatusCode
  data: T
}

export interface ReqParamOrderBook {
  group_orders: number // Value : 0 또는 1 (Default : 1)
  count: number // 	Value : 1 ~ 50 (Default : 20), ALL : 1 ~ 5(Default : 5)
}

export interface ReqParamTransactions {
  count: number // default 20
  offset: number // default 0
}
