// templates/starter/ParticleEffect.ts

import { Entity } from '../../src/core/Entity';
import { Scene } from '../../src/core/Scene';

const PARTICLE_LIFETIME = 800;

class ParticlePool {
    private pool: ParticleEffect[] = [];

    public create(
        x: number,
        y: number,
        type: string
    ): ParticleEffect {
        const particle = this.pool.pop();
        if (particle) {
            particle.reset(x, y, type);
            return particle;
        }
        return new ParticleEffect(x, y, type);
    }

    public return(particle: ParticleEffect): void {
        (particle as any).sceneRef = undefined;
        this.pool.push(particle);
    }
}

const pool = new ParticlePool();

export class ParticleEffect extends Entity {
    private timer = 0;
    private sceneRef?: Scene;

    constructor(
        x: number,
        y: number,
        assetKey: string
    ) {
        super(assetKey, x - 16, y - 16, 32, 32);
        this.isSolid = false;
        this.alpha = 1;
    }

    public static create(
        x: number,
        y: number,
        type: string
    ): ParticleEffect {
        return pool.create(x, y, type);
    }

    public reset(
        x: number,
        y: number,
        assetKey: string
    ): void {
        this.x = x - 16;
        this.y = y - 16;
        this.setAsset(assetKey);
        this.timer = 0;
        this.alpha = 1;
    }

    public setScene(scene: Scene): void {
        this.sceneRef = scene;
    }

    public update(dt: number): void {
        this.timer += dt;

        const t = this.timer / PARTICLE_LIFETIME;
        this.alpha = 1 - t * t;

        if (this.timer >= PARTICLE_LIFETIME && this.sceneRef) {
            this.sceneRef.removeEntity(this);
            pool.return(this);
        }
    }
    }
