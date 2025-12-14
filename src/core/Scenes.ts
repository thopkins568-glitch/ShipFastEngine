// src/core/Scene.ts
//
// Clean, minimal Scene class for ShipFast Engine
// --------------------------------------------
// Owns and orchestrates entities only.
// Does NOT handle input, physics, collisions, particles, tagging, or queries.

import { Entity } from './Entity';

export class Scene {
    /** All entities currently in the scene */
    private entities: Entity[] = [];

    /** Optional lifecycle hooks */
    onStart?(): void;
    onEnd?(): void;

    constructor() {
        // Intentionally empty — scene has no external dependencies here
    }

    /**
     * Add an entity to the scene.
     */
    addEntity(entity: Entity): void {
        this.entities.push(entity);
    }

    /**
     * Remove an entity from the scene.
     */
    removeEntity(entity: Entity): void {
        const index = this.entities.indexOf(entity);
        if (index >= 0) {
            this.entities.splice(index, 1);
        }
    }

    /**
     * Update all active entities.
     * @param dt Delta time in seconds
     */
    update(dt: number): void {
        // Use a copy to allow safe removal during update
        const entitiesToUpdate = [...this.entities];

        for (const entity of entitiesToUpdate) {
            if (entity.active) {
                entity.update(dt);
            }
        }

        // Clean up any entities that marked themselves for removal
        this.entities = this.entities.filter(entity => !entity.markedForRemoval);
    }

    /**
     * Render all active entities, sorted by z-order (lower z first).
     * @param ctx Canvas 2D rendering context
     */
    render(ctx: CanvasRenderingContext2D): void {
        const sorted = [...this.entities].sort((a, b) => a.z - b.z);

        for (const entity of sorted) {
            if (entity.active) {
                entity.render(ctx);
            }
        }
    }
}
