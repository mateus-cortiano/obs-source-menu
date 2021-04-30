declare const Hashes: any;
var SHA256 = new Hashes.SHA256();

export async function backoff_timer(
  condition: () => Boolean,
  max_retries: number = 7,
  base_time_multiplier: number = 50
): Promise<any> {
  async function retry(retries: number = 0): Promise<any> {
    if (retries)
      await new Promise((resolve) =>
        setTimeout(resolve, 2 ** retries * base_time_multiplier)
      );
    if (condition()) return Promise.resolve();
    if (retries > max_retries) return Promise.reject("Max retries reached");

    return retry(retries + 1);
  }
  return retry();
}

export function hasher(
  password: string,
  salt: string,
  challenge: string
): string {
  let secret: string = SHA256.b64(password + salt);
  let auth_response: string = SHA256.b64(secret + challenge);
  return auth_response;
}

export async function wait_for(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}