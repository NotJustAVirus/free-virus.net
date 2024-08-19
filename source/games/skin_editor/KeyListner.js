export class KeyListner {
    constructor() {
        this.keys = new Set();
        this.listeners = new Map();
        this.init();
    }

    init() {
        document.addEventListener('keydown', e => {
            this.keys.add(e.key);
            if (this.listeners.has(e.key)) {
                this.listeners.get(e.key)();
            }
        });
        document.addEventListener('keyup', e => {
            this.keys.delete(e.key);
        });
    }

    addListener(key, callback) {
        this.listeners.set(key, callback);
    }

    removeListener(key) {
        this.listeners.delete(key);
    }

    isKeyDown(key) {
        return this.keys.has(key);
    }
}