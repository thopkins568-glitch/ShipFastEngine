// src/render/Animation.ts

export class Animation {
    private currentFrame: number = 0;
    private timer: number = 0;

    constructor(private frames: HTMLImageElement[], private frameDuration: number, public flipX: boolean = false) {}

    public update(dt: number): void {
        this.timer += dt;
        while (this.timer >= this.frameDuration) {
            this.timer -= this.frameDuration;
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }
    }

    public render(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        const img = this.frames[this.currentFrame];
        ctx.save();
        if (this.flipX) {
            ctx.translate(x + width / 2, y + height / 2);
            ctx.scale(-1, 1);
            ctx.translate(-(x + width / 2), -(y + height / 2));
        }
        ctx.drawImage(img, x, y, width, height);
        ctx.restore();
    }

    public reset(): void {
        this.currentFrame = 0;
        this.timer = 0;
    }

    public getCurrentFrame(): number {
        return this.currentFrame;
    }
}
