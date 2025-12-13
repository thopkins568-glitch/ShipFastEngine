import { Entity } from '../../src/core/Entity.js';
import { Input } from '../../src/input/Input.js';
import { Renderer } from '../../src/render/Renderer.js';
import { AssetManager } from '../../src/render/AssetManager.js';
import { clamp } from '../../src/utils/Utils.js';

const SPEED = 200;

export class PlayerEntity extends Entity {
    spriteName = 'player_run';

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        private boundsWidth: number,
        private boundsHeight: number
    ) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update(dt: number) {
        this.vx = 0;
        this.vy = 0;

        if (Input.isKeyDown('ArrowLeft') || Input.isKeyDown('a')) this.vx = -SPEED;
        if (Input.isKeyDown('ArrowRight') || Input.isKeyDown('d')) this.vx = SPEED;
        if (Input.isKeyDown('ArrowUp') || Input.isKeyDown('w')) this.vy = -SPEED;
        if (Input.isKeyDown('ArrowDown') || Input.isKeyDown('s')) this.vy = SPEED;

        super.update(dt);

        this.x = clamp(this.x, 0, this.boundsWidth - this.width);
        this.y = clamp(this.y, 0, this.boundsHeight - this.height);

        const touch = Input.getActiveTouches()[0];
        if (touch) {
            this.x = touch.x - this.width / 2;
            this.y = touch.y - this.height / 2;

            this.x = clamp(this.x, 0, this.boundsWidth - this.width);
            this.y = clamp(this.y, 0, this.boundsHeight - this.height);
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        if (AssetManager.getTexture(this.spriteName)) {
            Renderer.drawSprite(ctx, this.spriteName, this.x, this.y, this.width, this.height);
        } else {
            Renderer.drawRect(ctx, this.x, this.y, this.width, this.height, 'magenta');
        }
    }
}
