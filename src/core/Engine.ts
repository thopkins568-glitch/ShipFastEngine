// src/core/Engine.ts
//
// Engine — the single place where DOM concerns live
// ------------------------------------------------
// Responsibilities:
// - Create and manage the canvas (responsive, high-DPI aware)
// - Handle resize with debounce
// - Clear canvas reliably every frame
// - Own the GameLoop instance
// - Provide a clean, safe public API
//
// All DOM/code cleanup is handled via destroy().

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

    /**
     * Creates the engine.
     * @param canvasId Optional ID of an existing <canvas>. If omitted, a new one is created.
     * @param backgroundColor Optional background fill color (CSS format) or null for transparent clear.
     */
    constructor(canvasId?: string, backgroundColor: string | null = Engine.DEFAULT_BG_COLOR) {
        this.backgroundColor = this.validateColor(backgroundColor) ? backgroundColor : Engine.DEFAULT_BG_COLOR;

        // 1. Get or create canvas
        if (canvasId) {
            const existing = document.getElementById(canvasId) as HTMLCanvasElement | null;
            if (!existing || !(existing instanceof HTMLCanvasElement)) {
                throw new Error(`Canvas with id "${canvasId}" not found or not a <canvas> element.`);
            }
            this.canvas = existing;
        } else {
            this.canvas = document.createElement('canvas');
            this.canvas.id = Engine.DEFAULT_CANVAS_ID;
            document.body.appendChild(this.canvas);

            // Full-window styling
            Object.assign(this.canvas.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                height: '100vh',
                margin: '0',
                padding: '0',
                background: '#000',
            });
            Object.assign(document.body.style, {
                margin: '0',
                padding: '0',
                overflow: 'hidden',
            });
        }

        // 2. Get context
        const ctx = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Failed to obtain 2D rendering context.');
        }
        this.context = ctx;

        // 3. Initial sizing
        this.performResize();

        // 4. Resize listener (debounced)
        window.addEventListener('resize', this.handleResize);

        // 5. Create GameLoop
        this.loop = new GameLoop(this.context);

        // 6. Inject reliable pre-render clear
        this.loop.setPreRender(() => {
            // Clear full drawing buffer
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            if (this.backgroundColor) {
                this.context.fillStyle = this.backgroundColor;
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }
        });
    }

    /**
     * Validate CSS color string using browser's own parser.
     */
    private validateColor(color: string | null): boolean {
        if (color === null) return true;
        const tester = new Option().style;
        tester.color = color;
        return tester.color !== '';
    }

    /**
     * Debounced resize handler.
     */
    private handleResize = (): void => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = window.setTimeout(() => {
            this.performResize();
        }, Engine.RESIZE_DEBOUNCE_MS);
    };

    /**
     * Perform the actual resize logic.
     * Handles high-DPI displays correctly and prevents scale accumulation.
     */
    private performResize(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // CSS display size
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;

        // Drawing buffer resolution (crisp on Retina/high-DPI)
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;

        // Reset transform matrix then apply scale — prevents accumulation
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.scale(dpr, dpr);
    }

    /**
     * Logical width in CSS pixels (use this for game logic).
     */
    public getWidth(): number {
        return window.innerWidth;
    }

    /**
     * Logical height in CSS pixels (use this for game logic).
     */
    public getHeight(): number {
        return window.innerHeight;
    }

    /**
     * Direct access to canvas element (rarely needed).
     */
    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public setScene(scene: Scene): void {
        this.loop.setScene(scene);
    }

    public start(): void {
        this.loop.start();
    }

    public stop(): void {
        this.loop.stop();
    }

    public pause(): void {
        this.loop.stop();
    }

    public resume(): void {
        this.loop.start();
    }

    public setBackgroundColor(color: string | null): void {
        this.backgroundColor = this.validateColor(color) ? color : Engine.DEFAULT_BG_COLOR;
    }

    /**
     * Clean up resources. Call when shutting down the game.
     */
    public destroy(): void {
        this.stop();
        window.removeEventListener('resize', this.handleResize);
        clearTimeout(this.resizeTimeout);

        // Optional: remove auto-created canvas
        if (this.canvas.id === Engine.DEFAULT_CANVAS_ID && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
                          }
