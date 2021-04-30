var SHA256 = new Hashes.SHA256();
export async function backoff_timer(condition, max_retries = 7, base_time_multiplier = 50) {
    async function retry(retries = 0) {
        if (retries)
            await new Promise((resolve) => setTimeout(resolve, 2 ** retries * base_time_multiplier));
        if (condition())
            return Promise.resolve();
        if (retries > max_retries)
            return Promise.reject("Max retries reached");
        return retry(retries + 1);
    }
    return retry();
}
export function hasher(password, salt, challenge) {
    let secret = SHA256.b64(password + salt);
    let auth_response = SHA256.b64(secret + challenge);
    return auth_response;
}
export async function wait_for(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
