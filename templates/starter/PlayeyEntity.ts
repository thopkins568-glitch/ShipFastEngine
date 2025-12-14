// templates/starter/PlayerEntity.ts

import { Entity } from '../../src/core/Entity';
import { Scene } from '../../src/core/Scene';
import { Input } from '../../src/input/Input';
import { Animation } from '../../src/render/Animation';
import { CollectibleEntity } from './CollectibleEntity';

export class PlayerEntity extends Entity {
    private gravity = 900;
    private jumpVelocity = 400;
    private moveSpeed = 200;

    private isGrounded = false;

    private animations: Record<string, Animation>;
    private currentAnim: Animation;

    constructor(x: number, y: number) {
        super('player_run', x, y, 32, 64);
        this.isSolid = true;

        this.animations = {
            idle: new Animation('player_run', 0, 1, 100),
            run: new Animation('player_run', 1, 4, 100),
            jump: new Animation('player_run', 5, 1, 100),
            fall: new Animation('player_run', 6, 1, 100),
        };

        this.currentAnim = this.animations.idle;
    }

    public update(dt: number, scene: Scene): void {
        const dtSec = dt / 1000;
        this.dx = 0;

        if (Input.isKeyDown('ArrowLeft') || Input.isKeyDown('a')) {
            this.dx = -this.moveSpeed;
            this.flipX = true;
        } else if (Input.isKeyDown('ArrowRight') || Input.isKeyDown('d')) {
            this.dx = this.moveSpeed;
            this.flipX = false;
        }

        if (Input.isKeyJustPressed('Space') && this.isGrounded) {
            this.dy = -this.jumpVelocity;
            this.isGrounded = false;
        }

        this.dy += this.gravity * dtSec;
        this.dy = Math.min(this.dy, 600);

        const oldX = this.x;
        const oldY = this.y;

        this.x += this.dx * dtSec;
        if (scene.isColliding(this)) this.x = oldX;

        this.y += this.dy * dtSec;
        const hit = scene.getSolidCollision(this);
        if (hit) {
            this.y = oldY;
            this.dy = 0;
            this.isGrounded = oldY < hit.entity.y;
        } else {
            this.isGrounded = false;
        }

        const pickups: CollectibleEntity[] = [];
        for (const e of scene.getOverlap(this)) {
            if (e instanceof CollectibleEntity) pickups.push(e);
        }
        pickups.forEach(p => p.onPickup(scene));

        if (!this.isGrounded) {
            this.currentAnim = this.dy < 0 ? this.animations.jump : this.animations.fall;
        } else if (this.dx !== 0) {
            this.currentAnim = this.animations.run;
        } else {
            this.currentAnim = this.animations.idle;
        }

        this.currentAnim.update(dt);
    }

    public render(ctx: CanvasRenderingContext2D, assets: any): void {
        this.currentAnim.render(
            ctx,
            assets,
            this.x,
            this.y,
            this.width,
            this.height,
            this.flipX
        );
    }
}
