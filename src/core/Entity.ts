// src/core/Entity.ts

export class Entity {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public dx: number = 0;
    public dy: number = 0;

    public isSolid: boolean = true;
    public alpha: number = 1;
    public flipX: boolean = false;

    constructor(
        public assetKey: string,
        x: number,
        y: number,
        width: number,
        height: number
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public update(_dt: number): void {
        // Overridden by subclasses
    }

    public render(ctx: CanvasRenderingContext2D, assets: any): void {
        const img = assets.get(this.assetKey);
        if (!img) return;

        ctx.save();
        ctx.globalAlpha = this.alpha;

        if (this.flipX) {
            ctx.translate(this.x + this.width, this.y);
            ctx.scale(-1, 1);
            ctx.drawImage(img, 0, 0, this.width, this.height);
        } else {
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        }

        ctx.restore();
    }
}
