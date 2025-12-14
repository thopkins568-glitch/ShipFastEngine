import { Scene } from './Scene';

export class GameLoop {
    private static readonly MAX_UPDATES_PER_FRAME = 5;

    private scene: Scene | null = null;
    private readonly context: CanvasRenderingContext2D;

    private running = false;
    private lastTime = 0;
    private accumulator = 0;
    private readonly fixedDt = 1 / 60;

    private preRenderCallback?: () => void;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    setPreRender(callback: () => void): void {
        this.preRenderCallback = callback;
    }

    setScene(scene: Scene): void {
        this.scene?.onEnd?.();
        this.scene = scene;
        this.scene?.onStart?.();
    }

    start(): void {
        if (this.running) return;
        this.running = true;
        this.lastTime = performance.now();
        requestAnimationFrame(this.loop);
    }

    stop(): void {
        this.running = false;
    }

    destroy(): void {
        this.stop();
        this.scene?.onEnd?.();
        this.scene = null;
        this.preRenderCallback = undefined;
    }

    private loop = (time: number): void => {
        if (!this.running) return;

        let dt = (time - this.lastTime) / 1000;
        this.lastTime = time;
        if (dt > 0.25) dt = 0.25;

        this.accumulator += dt;

        let updates = 0;
        while (this.accumulator >= this.fixedDt && updates < GameLoop.MAX_UPDATES_PER_FRAME) {
            this.scene?.update(this.fixedDt);
            this.accumulator -= this.fixedDt;
            updates++;
        }

        if (updates >= GameLoop.MAX_UPDATES_PER_FRAME) {
            this.accumulator = 0;
        }

        this.preRenderCallback?.();
        this.scene?.render(this.context);

        requestAnimationFrame(this.loop);
    };
}
