import { resolve } from 'node:path'
import { config } from 'dotenv'

export const NODE_ENV = process.env.NODE_ENV

const envPath = {
    development: `.env.development`,
    production: `.env.production`,
}
console.log({ en: envPath[NODE_ENV] });


config({ path: resolve(`./config/${envPath[NODE_ENV]}`) })


export const port = process.env.PORT ?? 7000

export const jj = process.env.jj 


export const SALT_ROUND = parseInt(process.env.SALT_ROUND ?? '10')
export const IV_LENGTH = parseInt(process.env.IV_LENGTH ?? '16')
export const ENC_SECRET_KEY = Buffer.from(process.env.ENC_SECRET_KEY)
console.log({SALT_ROUND});
