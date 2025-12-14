// templates/starter/ParticleEffect.ts

import { Entity } from '../../src/core/Entity';
import { Scene } from '../../src/core/Scene';

const PARTICLE_LIFETIME = 800;

class ParticlePool {
    private pool: ParticleEffect[] = [];

    public create(x: number, y: number, effectType: string): ParticleEffect {
        const particle = this.pool.pop() ?? new ParticleEffect(x, y, effectType);
        particle.reset(x, y, effectType);
        return particle;
    }

    public return(particle: ParticleEffect): void {
        (particle as any).sceneRef = undefined;
        this.pool.push(particle);
    }
}

const particlePool = new ParticlePool();

export class ParticleEffect extends Entity {
    private lifetime = PARTICLE_LIFETIME;
    private timer = 0;
    private sceneRef?: Scene;

    constructor(x: number, y: number, effectType = 'sparkle') {
        super(effectType, x - 16, y - 16, 32, 32);
        this.isSolid = false;
        this.alpha = 1;
    }

    static create(x: number, y: number, effectType: string): ParticleEffect {
        return particlePool.create(x, y, effectType);
    }

    public reset(x: number, y: number, effectType: string): void {
        this.x = x - 16;
        this.y = y - 16;
        this.timer = 0;
        this.alpha = 1;
    }

    public setScene(scene: Scene): void {
        this.sceneRef = scene;
    }

    public update(dt: number): void {
        this.timer += dt;

        const t = Math.min(1, this.timer / this.lifetime);
        this.alpha = Math.max(0, 1 - t * t);

        if (this.timer >= this.lifetime && this.sceneRef) {
            this.sceneRef.removeEntity(this);
            particlePool.return(this);
        }
    }
}
