import {applyMiddleware, createStore, Store} from 'redux'
import {reducer, RootState} from './reducer'
import thunk from 'redux-thunk'
import {createMongoDbSyncMiddleware, createDbSyncActionDispatcherMiddleware} from 'redux-sync-mongodb'
import {MONGODB} from './constatns/index'

const mongoDbSyncMiddleware = createMongoDbSyncMiddleware({
  mongoDbUrl: MONGODB,
  dbCollectionPrefix: 'exchanges'
})
const dbSyncActionDispatcherMiddleware = createDbSyncActionDispatcherMiddleware({
  filter: ['success']
})

export const store: Store<RootState> = createStore(
  reducer,
  applyMiddleware(thunk, mongoDbSyncMiddleware, dbSyncActionDispatcherMiddleware)
)
