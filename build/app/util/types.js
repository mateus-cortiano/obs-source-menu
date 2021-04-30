export class MessageBuffer {
    has(index) { return Boolean(this[index]); }
    add(value) { this[value["message-id"]] = value; }
    get(index) { return this[index]; }
    pop(index) {
        let message = this[index];
        delete this[index];
        return message;
    }
}
