export * from './bithumb'

import {combineReducers, Reducer} from 'redux'
import {Bithumb, reducer as bithumb} from './bithumb'

export const bitStreamReducer: Reducer<BitStreamState> = combineReducers({
  bithumb,
})

export interface BitStreamState {
  bithumb: Bithumb
}
