/* hash.ts */

import jsSHA from 'jssha'

// ---

function new_sha() {
  return new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' })
}

export function hasher(
  password: string,
  salt: string,
  challenge: string
): string {
  let secret: string
  let hash = new_sha()

  hash.update(password + salt)

  secret = hash.getHash('B64')
  hash = new_sha()

  hash.update(secret + challenge)

  return hash.getHash('B64')
}
