// templates/starter/ParticleEffect.ts

import { Entity } from '../../src/core/Entity';

const LIFETIME = 500;

export class ParticleEffect extends Entity {
    private timer: number = 0;

    private constructor(x: number, y: number, type: string) {
        super(type, x - 16, y - 16, 32, 32);
        this.alpha = 1;
        this.tag = 'particle';
    }

    public static create(x: number, y: number, type: string): ParticleEffect {
        const effect = new ParticleEffect(x, y, type);
        return effect;
    }

    public update(dt: number): void {
        this.timer += dt;
        if (this.timer >= LIFETIME) {
            this._shouldRemove = true;
        } else {
            const t = this.timer / LIFETIME;
            this.alpha = 1 - t * t;
        }
    }

    public reset(x: number, y: number, type: string): void {
        this.x = x - 16;
        this.y = y - 16;
        this.alpha = 1;
        this.timer = 0;
        this.setAsset(type);
    }
}
