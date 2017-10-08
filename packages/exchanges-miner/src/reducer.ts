import {Reducer} from 'redux'
import {bitStreamReducer, BitStreamState} from 'bit-stream'

export const reducer: Reducer<RootState> = bitStreamReducer

export interface RootState extends BitStreamState {}
