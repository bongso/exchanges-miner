import {Middleware} from 'redux'
import {CollectionInsertManyOptions, CollectionInsertOneOptions, MongoClient} from 'mongodb'

export interface Argument {
  mongoDbUrl: string
  dbCollectionPrefix: string
  insertOneOptions?: CollectionInsertOneOptions
  insertManyOptions?: CollectionInsertManyOptions
}

export function createMongoDbSyncMiddleware(argument: Argument): Middleware {
  const {mongoDbUrl, dbCollectionPrefix, insertOneOptions, insertManyOptions} = argument

  if (!mongoDbUrl || !dbCollectionPrefix) {
    throw new Error('createMongoDbSyncMiddleware({mongoDbUrl, dbCollectionPrefix})')
  }

  return ({dispatch, getState}) =>
    next =>
      action => {
        const {type, payload} = action
        const [requestType, name] = type.split(' ')
        if (requestType === 'success') {
          process.nextTick(async () => {
            if (!payload) {
              return
            }
            try {
              const db = await MongoClient.connect(mongoDbUrl)

              try {
                const collection = db.collection(`${dbCollectionPrefix}.${name}`)
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
              console.error(JSON.stringify(ex, null, 2))
            }
          })
        }

        return next(action)
      }
}