import {Middleware} from 'redux'

export const DB_SYNC = 'db-sync'

export interface DbSyncActionDispatcherArgument {
  filter: string[]
}
export function createDbSyncActionDispatcherMiddleware(argument: DbSyncActionDispatcherArgument): Middleware {
  const {filter = []} = argument

  return ({dispatch, getState}) =>
    next =>
      action => {
        const {type, payload} = action as any as { type: string, payload: any }
        const [requestType] = type.split(' ')

        if (filter.find(type => type === requestType)) {
          dispatch({
            type: `${DB_SYNC} ${type}`,
            payload
          })
        }

        return next(action)
      }
}
