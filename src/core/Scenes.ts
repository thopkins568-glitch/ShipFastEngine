// src/core/Scene.ts

import { Entity } from './Entity';
import { ParticleEffect } from '../../templates/starter/ParticleEffect';

/**
 * Represents a game scene containing entities and managing their lifecycle.
 */
export class Scene {
    public entities: Entity[] = [];
    public name: string = '';

    /**
     * Adds an entity to the scene.
     * Automatically injects scene reference if supported.
     */
    public addEntity(entity: Entity): void {
        this.entities.push(entity);

        // Automatic scene injection (safe, opt-in)
        if (typeof (entity as any).setScene === 'function') {
            (entity as any).setScene(this);
        }
    }

    /**
     * Removes an entity from the scene.
     */
    public removeEntity(entity: Entity): void {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities.splice(index, 1);
        }
    }

    /**
     * Spawns a particle effect at a given position.
     */
    public addParticleEffect(
        x: number,
        y: number,
        type: string = 'sparkle'
    ): void {
        const effect = ParticleEffect.create(x, y, type);
        this.addEntity(effect);
    }

    /**
     * Returns all entities overlapping the given entity.
     */
    public getOverlap(entity: Entity): Entity[] {
        return this.entities.filter(
            e => e !== entity && this.checkOverlap(entity, e)
        );
    }

    private checkOverlap(a: Entity, b: Entity): boolean {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }
}
