import {Model} from './model'
import * as moment from 'moment'
import {Currency} from './index'

export class CoinoneTicker extends Model<CoinonePublicTicker> {
  get openingPrice() {
    return this.cacheNumber('first')
  }

  get closingPrice() {
    return this.cacheNumber('last')
  }

  get minPrice() {
    return this.cacheNumber('low')
  }

  get maxPrice() {
    return this.cacheNumber('high')
  }

  get unitsTraded() {
    return this.cacheNumber('volume')
  }

  get volume1Day() {
    return this.cacheNumber('volume')
  }

  get date() {
    return this.cacheDate('timestamp')
  }
}


// https://api.coinone.co.kr/ticker
// coinone 거래소 마지막 거래 정보

export interface CoinonePublicTicker {
  volume: string
  last: string
  timestamp: Date
  high: string
  result: string
  errorCode: string
  first: string
  low: string
  currency: string
}

export type Date = string
