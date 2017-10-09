import {Middleware} from 'redux'

export const DB_SYNC = 'db-sync'

export interface ReduxCatchMiddlewareArgument {
  filter: string[]
  onFind(dispatch, getState, action)
}
export function createReduxCatchMiddleware<S>(argument: ReduxCatchMiddlewareArgument): Middleware {
  const {filter = [], onFind} = argument

  return <S>({dispatch, getState}) =>
    next =>
      action => {
        const {type} = action
        const [requestType] = type.split(' ')

        if (filter.find(type => type === requestType)) {
          onFind(dispatch, getState, action)
        }

        return next(action)
      }
}
