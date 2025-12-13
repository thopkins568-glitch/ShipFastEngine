type TouchPoint = { x: number; y: number };

export class Input {
    private static keys = new Set<string>();
    private static touches: TouchPoint[] = [];

    static initialize(canvas: HTMLCanvasElement) {
        window.addEventListener('keydown', e => this.keys.add(e.key));
        window.addEventListener('keyup', e => this.keys.delete(e.key));

        canvas.addEventListener('touchstart', e => this.handleTouch(e));
        canvas.addEventListener('touchmove', e => this.handleTouch(e));
        canvas.addEventListener('touchend', () => (this.touches = []));
    }

    private static handleTouch(e: TouchEvent) {
        e.preventDefault();
        this.touches = Array.from(e.touches).map(t => ({
            x: t.clientX,
            y: t.clientY
        }));
    }

    static isKeyDown(key: string) {
        return this.keys.has(key);
    }

    static getActiveTouches() {
        return this.touches;
    }
}
