import bcrypt from 'bcrypt'

const BCRYPT_HASH_PREFIX = /^\$2[aby]\$\d{2}\$/

export const isBcryptHash = (value) =>
  typeof value === 'string' && BCRYPT_HASH_PREFIX.test(value)

export const comparePassword = async (plainText, storedValue) => {
  if (typeof storedValue !== 'string' || !storedValue) {
    return false
  }

  if (isBcryptHash(storedValue)) {
    return bcrypt.compare(plainText, storedValue)
  }

  return plainText === storedValue
}
