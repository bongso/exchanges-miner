import * as moment from 'moment'

export class Model<T> {
  constructor(private _model: T, private _cache: T = {} as T) {
  }

  protected cache<P extends keyof T>(property: P, transform?: ((value) => any)): any {
    return this._cache[property] || (this._cache[property] = transform
        ? transform(this._model[property])
        : this._model[property]
    )
  }

  protected cacheNumber<P extends keyof T>(property: P): number {
    return this.cache(property, Number)
  }

  protected cacheDate<P extends keyof T>(property: P): moment.Moment {
    return this.cache(property, v => moment(new Date(Number(v))))
  }
}

