import { Scene } from './Scene.js';
import { GameLoop } from './GameLoop.js';
import { Input } from '../input/Input.js';

export class Engine {
    private ctx: CanvasRenderingContext2D;
    private currentScene: Scene | null = null;
    private loop: GameLoop;

    constructor(private canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context unavailable');
        this.ctx = ctx;

        Input.initialize(canvas);

        this.loop = new GameLoop(
            dt => this.update(dt),
            () => this.render()
        );
    }

    setScene(scene: Scene) {
        this.currentScene?.onExit();
        this.currentScene = scene;
        this.currentScene.onEnter();
    }

    start() {
        this.loop.start();
    }

    private update(dt: number) {
        this.currentScene?.update(dt);
    }

    private render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentScene?.render(this.ctx);
    }
}
