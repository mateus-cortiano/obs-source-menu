const Hashes: any = require('jshashes');
var SHA256 = new Hashes.SHA256();

/**
 * returns the authentication hash for the obs-websocket protocol
 * @param password obs-websocket password
 * @param salt obtained as a response to a 'authRequired' request
 * @param challenge obtained as a response to a 'authRequired' request
 * @returns 
 */
export function hasher(
  password: string,
  salt: string,
  challenge: string
): string {
  let secret: string = SHA256.b64(password + salt);
  let auth_response: string = SHA256.b64(secret + challenge);
  return auth_response;
}