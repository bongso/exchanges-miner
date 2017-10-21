import {GET, ReduxFetchAction} from 'redux-fetch'
import {createActions, SUCCESS} from '../../common'
import {
  CoinonePublicTicker,
  CoinoneTicker,
} from '../../../model/coinone'
import {Reducer} from 'redux'
import * as qs from 'querystring'

const defaultState = {
  tickers     : [],
}

export const coinone: Reducer<Coinone> = (state = defaultState, action: ReduxFetchAction<any>) => {
  switch (action.type) {
    case TICKER[SUCCESS]: {
      const {payload} = action as ReduxFetchAction<CoinoneResTicker>
      const ticker = payload
      const tickers = [new CoinoneTicker(ticker)].concat(state.tickers)
      return {
        ...state,
        tickers
      }
    }

    default:
      return state
  }
}

enum ActionTypes {
  Ticker = 'coinone ticker',
  OrderBook = 'coinone orderBook',
  Transactions = 'coinone transactions',
}

const TICKER = createActions(ActionTypes.Ticker)

export function coinoneApiTicker(currency: string = 'btc') {
  return GET(`${PUBLIC_API.Ticker}/${qs.stringify({currency})}`, TICKER)
}

const END_POINT = 'https://api.coinone.co.kr'
const PUBLIC_END_POINT = END_POINT
const PUBLIC_API = {
  Ticker: `${PUBLIC_END_POINT}/ticker`,
}

export interface Coinone {
  tickers: CoinoneTicker[]
}

type CoinoneResTicker = CoinoneResponse & CoinonePublicTicker

interface CoinoneResponse {
  result: string
  errorCode: string
}

