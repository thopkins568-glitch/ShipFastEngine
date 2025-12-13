export class GameLoop {
    private lastTime = 0;
    private running = false;

    constructor(
        private update: (dt: number) => void,
        private render: () => void
    ) {}

    start() {
        this.running = true;
        requestAnimationFrame(this.loop);
    }

    stop() {
        this.running = false;
    }

    private loop = (time: number) => {
        if (!this.running) return;

        // dt is in seconds (not milliseconds)
        const dt = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.update(dt);
        this.render();

        requestAnimationFrame(this.loop);
    };
}
