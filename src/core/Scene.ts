// src/core/Scene.ts

import { Entity } from './Entity';

/**
 * Represents a game scene containing entities and managing their lifecycle.
 */
export class Scene {
    public entities: Entity[] = [];
    public name: string = '';

    /**
     * Adds an entity to the scene.
     * Safely injects scene reference if supported by the entity.
     */
    public addEntity(entity: Entity): void {
        this.entities.push(entity);

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
     * Gets all entities overlapping with a given entity.
     */
    public getOverlap(entity: Entity): Entity[] {
        return this.entities.filter(e => e !== entity && this.checkOverlap(entity, e));
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
