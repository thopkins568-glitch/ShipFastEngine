import { AssetManager } from './AssetManager.js';

export class Animation {
    private elapsed = 0;
    private currentFrame = 0;

    constructor(
        public spriteName: string,
        private fps = 8
    ) {}

    update(dt: number) {
        const frameCount = AssetManager.getFrameCount(this.spriteName);
        if (frameCount <= 1) return;

        this.elapsed += dt;
        const frameDuration = 1 / this.fps;
        if (this.elapsed >= frameDuration) {
            this.elapsed -= frameDuration;
            this.currentFrame = (this.currentFrame + 1) % frameCount;
        }
    }

    draw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        const img = AssetManager.getTexture(this.spriteName);
        if (!img) {
            ctx.fillStyle = 'magenta';
            ctx.fillRect(x, y, w, h);
            return;
        }

        const frameCount = AssetManager.getFrameCount(this.spriteName);
        const frameWidth = img.width / frameCount;
        ctx.drawImage(
            img,
            frameWidth * this.currentFrame,
            0,
            frameWidth,
            img.height,
            x,
            y,
            w,
            h
        );
    }
}
