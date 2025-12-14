// src/render/Animation.ts

export class Animation {
    private timer = 0;
    private currentFrame = 0;

    constructor(
        private assetKey: string,
        private startFrame: number,
        private frameCount: number,
        private frameDuration: number
    ) {}

    public update(dt: number): void {
        this.timer += dt;

        while (this.timer >= this.frameDuration) {
            this.timer -= this.frameDuration;
            this.currentFrame =
                (this.currentFrame + 1) % this.frameCount;
        }
    }

    public reset(): void {
        this.timer = 0;
        this.currentFrame = 0;
    }

    public getCurrentFrame(): number {
        return this.currentFrame;
    }

    public render(
        ctx: CanvasRenderingContext2D,
        assets: any,
        x: number,
        y: number,
        width: number,
        height: number,
        flipX: boolean = false
    ): void {
        const img = assets.get(this.assetKey);
        if (!img) return;

        const frameX =
            (this.startFrame + this.currentFrame) * width;

        ctx.save();

        if (flipX) {
            ctx.translate(x + width, y);
            ctx.scale(-1, 1);
            ctx.drawImage(
                img,
                frameX,
                0,
                width,
                height,
                0,
                0,
                width,
                height
            );
        } else {
            ctx.drawImage(
                img,
                frameX,
                0,
                width,
                height,
                x,
                y,
                width,
                height
            );
        }

        ctx.restore();
    }
}
