// src/core/Entity.ts

export class Entity {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public isSolid: boolean = false;
    public alpha: number = 1;
    public flipX: boolean = false;
    public tag: string = '';
    public _shouldRemove: boolean = false;

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

    public setAsset(key: string): void {
        this.assetKey = key;
    }

    public destroy(): void {
        this._shouldRemove = true;
    }

    public update(dt: number, scene?: any): void {}

    public render(ctx: CanvasRenderingContext2D, assets?: any): void {
        if (assets && assets[this.assetKey]) {
            ctx.save();
            ctx.globalAlpha = this.alpha;

            if (this.flipX) {
                ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
                ctx.scale(-1, 1);
                ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
            }

            ctx.drawImage(
                assets[this.assetKey],
                this.x,
                this.y,
                this.width,
                this.height
            );
            ctx.restore();
        } else {
            ctx.fillStyle = '#FF00FF';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
