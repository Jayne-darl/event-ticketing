import { config } from 'dotenv'

config()

export const dev_config = {
  secrets: {
    jwt: process.env.jwt_secret,
  },
  db_url: process.env.mongo_url,
}
