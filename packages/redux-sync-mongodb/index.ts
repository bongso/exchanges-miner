export * from './dispatcher'

import {Middleware} from 'redux'
import {CollectionInsertManyOptions, CollectionInsertOneOptions, MongoClient} from 'mongodb'
import {DB_SYNC} from './dispatcher'

export interface Argument {
  mongoDbUrl: string
  dbCollectionPrefix: string
  insertOneOptions?: CollectionInsertOneOptions
  insertManyOptions?: CollectionInsertManyOptions
}

export function createMongoDbSyncMiddleware(argument: Argument): Middleware {
  const {mongoDbUrl, dbCollectionPrefix, insertOneOptions, insertManyOptions} = argument

  if (!mongoDbUrl || !dbCollectionPrefix) {
    const errorMessage = `createMongoDbSyncMiddleware({mongoDbUrl: ${mongoDbUrl}, dbCollectionPrefix: ${dbCollectionPrefix})`
    console.error(errorMessage)
    throw new Error(errorMessage)
  }

  return ({dispatch, getState}) =>
    next =>
      action => {
        const {type, payload} = action as any as {type: string, payload: any}
        const [dbSync, requestType, ...name] = type.split(' ')

        if (dbSync === DB_SYNC) {
          process.nextTick(async () => {
            if (!payload) {
              return
            }
            try {
              const db = await MongoClient.connect(mongoDbUrl)

              try {
                const collection = db.collection(`${dbCollectionPrefix}.${name.join('.')}`)
                if (Array.isArray(payload)) {
                  await collection.insertMany(payload, insertManyOptions)
                } else {
                  await collection.insertOne(payload, insertOneOptions)
                }
              } catch (ex) {
                console.error(JSON.stringify(ex, null, 2))
              } finally {
                db.close()
              }
            } catch (ex) {
              console.error('mongodb: ' + mongoDbUrl)
              console.error(JSON.stringify(ex, null, 2))
            }
          })
        }

        return next(action)
      }
}
