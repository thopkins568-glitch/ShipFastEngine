import { GameLoop } from './GameLoop';
import { Scene } from './Scene';

export class Engine {
    private static readonly DEFAULT_CANVAS_ID = 'shipfast-engine-canvas';
    private static readonly DEFAULT_BG_COLOR = '#000000';
    private static readonly RESIZE_DEBOUNCE_MS = 100;

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private loop: GameLoop;

    private backgroundColor: string | null;
    private resizeTimeout?: number;

    constructor(canvasId?: string, backgroundColor: string | null = Engine.DEFAULT_BG_COLOR) {
        this.backgroundColor = this.validateColor(backgroundColor) ? backgroundColor : Engine.DEFAULT_BG_COLOR;

        if (canvasId) {
            const existing = document.getElementById(canvasId) as HTMLCanvasElement | null;
            if (!existing || !(existing instanceof HTMLCanvasElement)) {
                throw new Error(`Canvas with id "${canvasId}" not found or not a <canvas>.`);
            }
            this.canvas = existing;
        } else {
            this.canvas = document.createElement('canvas');
            this.canvas.id = Engine.DEFAULT_CANVAS_ID;
            document.body.appendChild(this.canvas);

            Object.assign(this.canvas.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                height: '100vh',
                margin: '0',
                padding: '0'
            });

            Object.assign(document.body.style, {
                margin: '0',
                padding: '0',
                overflow: 'hidden'
            });
        }

        const ctx = this.canvas.getContext('2d');
        if (!ctx) throw new Error('Failed to get 2D context.');
        this.context = ctx;

        this.performResize();
        window.addEventListener('resize', this.handleResize);

        this.loop = new GameLoop(this.context);
        this.loop.setPreRender(() => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (this.backgroundColor) {
                this.context.fillStyle = this.backgroundColor;
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }
        });
    }

    private validateColor(color: string | null): boolean {
        if (color === null) return true;
        const tester = new Option().style;
        tester.color = color;
        return tester.color !== '';
    }

    private handleResize = (): void => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = window.setTimeout(
            () => this.performResize(),
            Engine.RESIZE_DEBOUNCE_MS
        );
    };

    private performResize(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;

        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;

        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.scale(dpr, dpr);
    }

    setScene(scene: Scene): void {
        this.loop.setScene(scene);
    }

    start(): void {
        this.loop.start();
    }

    stop(): void {
        this.loop.stop();
    }

    destroy(): void {
        this.stop();
        this.loop.destroy();
        window.removeEventListener('resize', this.handleResize);
        clearTimeout(this.resizeTimeout);

        if (this.canvas.id === Engine.DEFAULT_CANVAS_ID) {
            this.canvas.remove();
        }
    }
}
