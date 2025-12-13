import { AssetManager } from './AssetManager.js';

export class Renderer {
    static drawSprite(
        ctx: CanvasRenderingContext2D,
        name: string,
        x: number,
        y: number,
        w: number,
        h: number
    ) {
        const img = AssetManager.getTexture(name);
        if (img) ctx.drawImage(img, x, y, w, h);
    }

    static drawRect(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        w: number,
        h: number,
        color: string
    ) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }
}
