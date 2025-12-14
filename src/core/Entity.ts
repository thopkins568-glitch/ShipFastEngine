// src/core/Entity.ts

export class Entity {
    protected assetKey: string;

    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public dx = 0;
    public dy = 0;
    public isSolid = true;
    public alpha = 1;
    public flipX = false;

    constructor(
        assetKey: string,
        x: number,
        y: number,
        width: number,
        height: number
    ) {
        this.assetKey = assetKey;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public setAsset(key: string): void {
        this.assetKey = key;
    }

    public update(_dt: number): void {}

    public render(
        ctx: CanvasRenderingContext2D,
        assets: any
    ): void {
        const img = assets.get(this.assetKey);
        if (!img) return;

        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}
