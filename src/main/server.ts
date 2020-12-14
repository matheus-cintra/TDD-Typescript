import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import config from './config/env'

MongoHelper.connect(config.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(config.port, () =>
      console.warn(`Server Running at port ${config.port}`)
    )
  })
  .catch(console.error)
