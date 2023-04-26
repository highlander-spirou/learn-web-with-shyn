import crypto from 'crypto'

// const SECRET = 'ANTONIO-REST-API';
const SECRET = process.env.SECRET_KEY ?? 'secret_key'

console.log('SECRET', SECRET)

export const authentication = (salt: string, password: string): string => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

export const random = () => crypto.randomBytes(128).toString('base64');