export class Storage {
    static save(key: string, data: unknown) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static load<T>(key: string): T | null {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    }
}
