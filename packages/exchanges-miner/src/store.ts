import {applyMiddleware, createStore, Store} from 'redux'
import {reducer, RootState} from './reducer'
import thunk from 'redux-thunk'
import {createMongoDbSyncMiddleware, createReduxCatchMiddleware} from 'redux-sync-mongodb'
import {MONGODB} from './constatns/index'
import {DB_SYNC} from '../dist/redux-sync-mongodb/dispatcher'
import {deepEqual} from 'assert'

const mongoDbSyncMiddleware = createMongoDbSyncMiddleware({
  mongoDbUrl: MONGODB,
  dbCollectionPrefix: 'exchanges'
})
const dbSyncActionDispatcherMiddleware = createReduxCatchMiddleware<RootState>({
  filter: ['success'],
  onFind(dispatch, getState, action) {
    const [exchange, api] = action

    try {
      const recentValue = getState()[exchange][api]
      // deepEqual(recentValue, action.payload)
      dispatch({
        type: [DB_SYNC, action.type].join(' '),
        payload: action.payload
      })
    } catch (ex) {

    }
  }
})

export const store: Store<RootState> = createStore(
  reducer,
  applyMiddleware(thunk, mongoDbSyncMiddleware, dbSyncActionDispatcherMiddleware)
)
