// src/core/GameLoop.ts
//
// Minimal, rock-solid game loop for ShipFast Engine
// ------------------------------------------------
// Fixed timestep update + variable render
// Dependency-injected rendering context
// No extras: no pause, no input, no scene stacking.

import { Scene } from './Scene';

export class GameLoop {
    private scene: Scene | null = null;
    private readonly context: CanvasRenderingContext2D;

    private running = false;
    private lastTime = 0;

    // Fixed update timestep (60 UPS)
    private readonly fixedDt = 1 / 60;
    private accumulator = 0;

    // Optional simple FPS tracking
    private frameCount = 0;
    private fpsTime = 0;
    public fps = 0;
    public showFps = false; // Set to true for console FPS logging

    /**
     * @param context The 2D rendering context for the canvas.
     */
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    /**
     * Set or change the current scene.
     * Safely calls onEnd() on the previous scene and onStart() on the new one.
     */
    setScene(scene: Scene): void {
        if (this.scene?.onEnd) {
            this.scene.onEnd();
        }

        this.scene = scene;

        if (this.scene?.onStart) {
            this.scene.onStart();
        }
    }

    /**
     * Start the game loop.
     */
    start(): void {
        if (this.running) return;

        if (!this.scene) {
            console.warn('GameLoop started without a scene set.');
        }

        this.running = true;
        this.lastTime = performance.now(); // ← Ensures accurate first delta
        requestAnimationFrame(this.loop);
    }

    /**
     * Stop the game loop.
     */
    stop(): void {
        this.running = false;
    }

    private loop = (currentTime: number): void => {
        if (!this.running) return;

        // Delta time in seconds
        let dt = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        // Cap extreme deltas (e.g., when tab resumes)
        if (dt > 0.25) dt = 0.25;

        this.accumulator += dt;

        // Fixed-timestep updates
        while (this.accumulator >= this.fixedDt) {
            this.scene?.update(this.fixedDt);
            this.accumulator -= this.fixedDt;
        }

        // Variable-timestep render
        this.scene?.render(this.context);

        // FPS counter (optional)
        if (this.showFps) {
            this.frameCount++;
            this.fpsTime += dt;
            if (this.fpsTime >= 1) {
                this.fps = this.frameCount;
                console.log(`FPS: ${this.fps}`);
                this.frameCount = 0;
                this.fpsTime = 0; // ← Clean reset, no drift
            }
        }

        requestAnimationFrame(this.loop);
    };
}
