/* parse.ts */

import { OBSMessage } from './interfaces'

// ---

export namespace parse {
  export function parse(message: MessageEvent): OBSMessage {
    let parsed: OBSMessage = {}
    let json = JSON.parse(message.data)

    Object.keys(json).forEach(val => {
      let key = val.replace('-', '_')
      parsed[key as keyof OBSMessage] = json[val]
    })

    return parsed
  }

  export function stringify(message: OBSMessage): string {
    let replaced: OBSMessage = {}

    Object.keys(message).forEach(val => {
      let key = val.replace('_', '-')
      replaced[key as keyof OBSMessage] = message[val as keyof OBSMessage]
    })

    return JSON.stringify(replaced)
  }

  // ---

  const pattern = /(?:(wss?)\:\/\/)?([\d\w\.]*)(?::([\d]*)$)?/

  export function parse_host(host: string): string {
    if (host === '') return 'ws://localhost:4444'

    let result = pattern.exec(host)

    if (result === null) return 'ws://localhost:4444'

    let protocol = result[1]
    let address = result[2]
    let port = result[3]

    if (address === undefined) throw Error(`Undefined address: '${address}'.`)
    if (protocol === undefined) protocol = 'ws'
    if (port === undefined) port = '4444'

    return `${protocol}://${address}:${port}`
  }
}

export default parse
