export class MessageBuffer {
    has(index) { return Boolean(this[index]); }
    add(index, value) { this[index] = value; }
    get(index) { return this[index]; }
    pop(index) {
        let message = this[index];
        delete this[index];
        return message;
    }
}
