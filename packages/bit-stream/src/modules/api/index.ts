export * from './bithumb'
export * from './coinone'

import {combineReducers, Reducer} from 'redux'
import {Bithumb, bithumb} from './bithumb'
import {Coinone, coinone} from './coinone'

export const bitStreamReducer: Reducer<BitStreamState> = combineReducers({
  bithumb,
  coinone
})

export interface BitStreamState {
  bithumb: Bithumb
  coinone: Coinone
}
