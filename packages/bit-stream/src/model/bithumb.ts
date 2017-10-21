import {Model} from './model'
import * as moment from 'moment'
import {Currency} from './index'

export class BithumbTicker extends Model<BithumbPublicTicker> {
  get openingPrice() {
    return this.cacheNumber('opening_price')
  }

  get closingPrice() {
    return this.cacheNumber('closing_price')
  }

  get minPrice() {
    return this.cacheNumber('min_price')
  }

  get maxPrice() {
    return this.cacheNumber('max_price')
  }

  get averagePrice() {
    return this.cacheNumber('average_price')
  }

  get unitsTraded() {
    return this.cacheNumber('units_traded')
  }

  get volume1Day() {
    return this.cacheNumber('volume_1day')
  }

  get volume7Day() {
    return this.cacheNumber('volume_7day')
  }

  get buyPrice() {
    return this.cacheNumber('buy_price')
  }

  get sellPrice() {
    return this.cacheNumber('sell_price')
  }

  get date() {
    return this.cacheDate('date')
  }
}

export class BithumbOrderBook extends Model<BithumbPublicOrderBook> {
  get timestamp() {
    return this.cacheDate('timestamp')
  }
  get orderCurrency(): Currency {
    return this.cache('order_currency')
  }

  get payment_currency() {
    return this.cacheNumber('payment_currency')
  }

  get asks(): TransactionData[] {
    return this.cache('bids')
  }

  get total(): TransactionData[] {
    return this.cache('asks')
  }
}

export class BithumbTransaction extends Model<BithumbPublicRecentTransactions> {
  get type(): TransactionType {
    return this.cache('type')
  }

  get unitsTraded() {
    return this.cacheNumber('units_traded')
  }

  get price() {
    return this.cacheNumber('price')
  }

  get total() {
    return this.cacheNumber('total')
  }

  get transactionDate() {
    return this.cacheDate('transaction_date')
  }
}

// https://api.bithumb.com/public/ticker/{currency}
// bithumb 거래소 마지막 거래 정보

export interface BithumbPublicTicker {
  opening_price: string // 최근 24시간 내 시작 거래금액
  closing_price: string // 최근 24시간 내 마지막 거래금액
  min_price: string // 최근 24시간 내 최저 거래금액
  max_price: string // 최근 24시간 내 최고 거래금액
  average_price: string // 최근 24시간 내 평균 거래금액
  units_traded: string // 최근 24시간 내 Currency 거래량
  volume_1day: string // 최근 1일간 Currency 거래량
  volume_7day: string // 최근 7일간 Currency 거래량
  buy_price: string // 거래 대기건 최고 구매가
  sell_price: string // 거래 대기건 최소 판매가
  date: Date //	현재 시간 Timestamp
}

// https://api.bithumb.com/public/orderbook/{currency}
// bithumb 거래소 판/구매 등록 대기 또는 거래 중 내역 정보

export interface BithumbPublicOrderBook {
  timestamp: Date // 현재 시간 Timestamp
  order_currency: Currency // 주문 화폐단위
  payment_currency: Currency // 결제 화폐단위
  bids: TransactionData[] // 구매요청
  asks: TransactionData[] // 판매요청
}

// https://api.bithumb.com/public/recent_transactions/{currency}
// bithumb 거래소 거래 체결 완료 내역

export interface BithumbPublicRecentTransactions {
  transaction_date: Date //	거래 채결 시간
  type: TransactionType // 판/구매 (ask, bid)
  units_traded: string //	거래 Currency 수량
  price: string // 1Currency 거래 금액
  total: string // 총 거래금액
}

/*
  Internal
 */

export interface TransactionData {
  quantity: string // Currency 수량
  price: string // Currency당 거래금액
}
export type TransactionType = ASK | BID

export type ASK = 'ask'
export type BID = 'bid'

export type Date = string
