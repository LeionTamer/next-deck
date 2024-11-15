import { Pool } from 'pg'

let pgPool

if (!pgPool) {
  pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
}

export default pgPool as Pool
