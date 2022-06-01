/* parse.test.ts */

import { describe, expect, test } from '@jest/globals'
import { parse, stringify, parse_host } from '../src/socket/parse'

// ---

describe('parsers tests', () => {
  test('should correctly parse host url', () => {
    const test_cases: [string, string][] = [
      ['', 'ws://localhost:4444'],
      ['localhost', 'ws://localhost:4444'],
      ['localhost:4444', 'ws://localhost:4444'],
      ['ws://localhost', 'ws://localhost:4444'],
      ['ws://localhost:4444', 'ws://localhost:4444'],
      ['127.0.0.1', 'ws://127.0.0.1:4444'],
      ['127.0.0.1:4444', 'ws://127.0.0.1:4444'],
      ['ws://127.0.0.1', 'ws://127.0.0.1:4444'],
      ['ws://127.0.0.1:4444', 'ws://127.0.0.1:4444']
    ]

    for (let [input, output] of test_cases) {
      expect(parse_host(input)).toBe(output)
    }
  })
})
