// templates/starter/ProjectileEntity.ts

import { Entity } from '../../src/core/Entity';
import { Scene } from '../../src/core/Scene';

const PROJECTILE_SPEED = 300;
const PROJECTILE_DAMAGE = 5;
const PROJECTILE_LIFETIME = 2000;

export class ProjectileEntity extends Entity {
    private vx: number;
    private vy: number;
    private timer: number = 0;
    private lifetime: number;

    constructor(x: number, y: number, directionX: number, directionY: number, lifetime: number = PROJECTILE_LIFETIME) {
        super('enemy_projectile', x, y, 16, 16);
        this.isSolid = false;
        this.tag = 'projectile';
        this.lifetime = lifetime;

        const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
        if (magnitude > 0) {
            this.vx = (directionX / magnitude) * PROJECTILE_SPEED;
            this.vy = (directionY / magnitude) * PROJECTILE_SPEED;
        } else {
            this.vx = PROJECTILE_SPEED;
            this.vy = 0;
        }
    }

    public update(dt: number, scene: Scene): void {
        if (this._shouldRemove) return;

        this.timer += dt;
        if (this.timer >= this.lifetime) {
            this._shouldRemove = true;
            return;
        }

        const dtSeconds = dt / 1000;
        this.x += this.vx * dtSeconds;
        this.y += this.vy * dtSeconds;

        const bounds = scene.getCanvasBounds();
        if (this.x < -this.width || this.x > bounds.width || this.y < -this.height || this.y > bounds.height) {
            this._shouldRemove = true;
            return;
        }

        const overlaps = scene.getOverlappingEntities(this);
        for (const entity of overlaps) {
            if (entity.tag === 'player' && typeof (entity as any).takeDamage === 'function') {
                (entity as any).takeDamage(PROJECTILE_DAMAGE);
                this._shouldRemove = true;
                break;
            } else if (entity.isSolid && entity.tag !== 'projectile') {
                this._shouldRemove = true;
                break;
            }
        }
    }
}
