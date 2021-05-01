
/**
 * async function that wait for determined time
 * @param ms time to wait for
 * @returns void promise
 */
export async function wait_for(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * an exponential backoff timer that resolves after the condition is met or reject if max retries are reached
 * @param condition callback function that checks if condition to stop waiting is true
 * @param max_retries max retries before rejecting the promise (default=7)
 * @param base_time_multiplier for more control over the waiting time (default=50)
 * @returns void promise
 */
export async function wait_for_condition(
  condition: () => Boolean,
  max_retries: number = 7,
  base_time_multiplier: number = 50
): Promise<any> {
  async function retry(retries: number = 0): Promise<any> {
    if (retries)
      await wait_for(2 ** retries * base_time_multiplier);
    if (condition()) return Promise.resolve();
    if (retries > max_retries) return Promise.reject("Max retries reached");

    return retry(retries + 1);
  }
  return retry();
}


