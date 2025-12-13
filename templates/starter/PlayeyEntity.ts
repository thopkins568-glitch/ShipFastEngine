import { Entity } from '../../src/core/Entity.js';
import { Input } from '../../src/input/Input.js';
import { Renderer } from '../../src/render/Renderer.js';
import { Animation } from '../../src/render/Animation.js';
import { clamp } from '../../src/utils/Utils.js';

const SPEED = 200;

export class PlayerEntity extends Entity {
    private animation: Animation;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        private boundsWidth: number,
        private boundsHeight: number,
        spriteName = 'player_run'
    ) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.animation = new Animation(spriteName, 8); // default 8 FPS
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

        this.animation.update(dt);
    }

    render(ctx: CanvasRenderingContext2D) {
        this.animation.draw(ctx, this.x, this.y, this.width, this.height);
    }
}
