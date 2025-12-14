// src/core/Entity.ts // // Base Entity class for ShipFast Engine // --------------------------------- // An Entity is a simple, explicit unit of behavior. // It knows how to update itself and how to render itself. // It does NOT know about the Engine, Scene, Input, or other entities.

export abstract class Entity { /** Whether this entity should be updated and rendered */ active: boolean = true;

/** Z-order for rendering (higher renders later) */
z: number = 0;

constructor(z: number = 0) {
    this.z = z;
}

/**
 * Update the entity's state.
 * @param dt Delta time in seconds
 */
update(dt: number): void {
    // Intentionally empty
}

/**
 * Render the entity.
 * @param ctx Canvas 2D rendering context
 */
render(ctx: CanvasRenderingContext2D): void {
    // Intentionally empty
}

                             }
