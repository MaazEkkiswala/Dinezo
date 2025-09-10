import { Sequelize } from '@sequelize/core'
import { SqliteDialect } from '@sequelize/sqlite3'

const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: './main.db'
})

export default sequelize
