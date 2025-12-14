// templates/starter/EnemyEntity.ts

import { Entity } from '../../src/core/Entity';
import { Scene } from '../../src/core/Scene';

const DEFAULT_PATROL_SPEED = 100;
const DEFAULT_PATROL_DISTANCE = 150;
const DEFAULT_DAMAGE = 10;
const DEFAULT_COOLDOWN = 1000;

export class EnemyEntity extends Entity {
    private startX: number;
    private direction: number = 1;
    private patrolDistance: number;
    private lastDamageTime: number = 0;
    private patrolSpeed: number;
    private damageCooldown: number;

    constructor(
        x: number,
        y: number,
        patrolDistance: number = DEFAULT_PATROL_DISTANCE,
        patrolSpeed: number = DEFAULT_PATROL_SPEED,
        damageCooldown: number = DEFAULT_COOLDOWN
    ) {
        super('enemy', x, y, 32, 32);
        this.startX = x;
        this.patrolDistance = patrolDistance;
        this.patrolSpeed = patrolSpeed;
        this.damageCooldown = damageCooldown;
        this.isSolid = true;
        this.tag = 'enemy';
    }

    public update(dt: number, scene: Scene): void {
        const dtSeconds = dt / 1000;
        this.x += this.direction * this.patrolSpeed * dtSeconds;
        this.flipX = this.direction < 0;

        if (this.x < this.startX) this.x = this.startX;
        if (this.x > this.startX + this.patrolDistance) this.x = this.startX + this.patrolDistance;

        if ((this.direction > 0 && this.x >= this.startX + this.patrolDistance) ||
            (this.direction < 0 && this.x <= this.startX)) {
            this.direction *= -1;
        }

        const now = Date.now();
        if (now - this.lastDamageTime >= this.damageCooldown) {
            const overlaps = scene.getOverlappingEntities(this);
            for (const entity of overlaps) {
                if (entity.tag === 'player' && typeof (entity as any).takeDamage === 'function') {
                    (entity as any).takeDamage(DEFAULT_DAMAGE);
                    this.lastDamageTime = now;
                    break;
                }
            }
        }
    }
}
