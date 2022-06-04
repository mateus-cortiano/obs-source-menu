/* timers.ts */

export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function wait_for(
  condition: () => Boolean,
  max_retries = 5,
  time_mult = 5
) {
  async function retry(retries = 0): Promise<any> {
    if (condition()) return Promise.resolve()

    if (retries > max_retries)
      return Promise.reject(`Max retries reached for ${condition}`)

    await sleep(time_mult ** retries)

    return retry(retries + 1)
  }

  return retry()
}

export namespace timers {
  export async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  export async function wait_for(
    condition: () => Boolean,
    max_retries = 5,
    time_mult = 5
  ) {
    async function retry(retries = 0): Promise<any> {
      if (condition()) return Promise.resolve()

      if (retries > max_retries)
        return Promise.reject(`Max retries reached for ${condition}`)

      await sleep(time_mult ** retries)

      return retry(retries + 1)
    }

    return retry()
  }
}

export default timers
