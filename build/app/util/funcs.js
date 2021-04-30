var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var SHA256 = new Hashes.SHA256();
export function backoff_timer(condition, max_retries = 7, base_time_multiplier = 50) {
    return __awaiter(this, void 0, void 0, function* () {
        function retry(retries = 0) {
            return __awaiter(this, void 0, void 0, function* () {
                if (retries)
                    yield new Promise((resolve) => setTimeout(resolve, Math.pow(2, retries) * base_time_multiplier));
                if (condition())
                    return Promise.resolve();
                if (retries > max_retries)
                    return Promise.reject("Max retries reached");
                return retry(retries + 1);
            });
        }
        return retry();
    });
}
export function hasher(password, salt, challenge) {
    let secret = SHA256.b64(password + salt);
    let auth_response = SHA256.b64(secret + challenge);
    return auth_response;
}
export function wait_for(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
