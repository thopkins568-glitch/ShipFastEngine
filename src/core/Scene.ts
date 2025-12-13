import { Entity } from './Entity.js';
import { isColliding } from '../utils/Utils.js'; // New Import

export class Scene {
    protected entities: Entity[] = [];
    protected solidEntities: Entity[] = []; // New cache for solid entities

    onEnter(): void {}
    onExit(): void {}

    addEntity(entity: Entity) {
        this.entities.push(entity);
        if (entity.isSolid) {
            this.solidEntities.push(entity);
        }
    }

    update(dt: number) {
        for (const e of this.entities) {
            // 1. Store old position before moving
            const oldX = e.x;
            const oldY = e.y;
            
            // 2. Perform base kinematic update
            e.update(dt); 
            
            // 3. Collision Check and Resolution
            if (!e.isSolid) { // Only dynamic entities need collision resolution against solids
                this.resolveCollisions(e, oldX, oldY);
            }
        }
    }

    private resolveCollisions(entity: Entity, oldX: number, oldY: number) {
        for (const solid of this.solidEntities) {
            if (entity === solid) continue; // Don't check against self

            if (isColliding(entity.x, entity.y, entity.width, entity.height,
                            solid.x, solid.y, solid.width, solid.height)) {
                
                // Collision detected! Resolve by pushing the entity out.
                let dx = 0;
                let dy = 0;

                // --- Resolution on Y-axis (Vertical Collision) ---
                // If the entity wasn't colliding vertically before the move, resolve Y first
                if (!isColliding(entity.x, oldY, entity.width, entity.height, 
                                 solid.x, solid.y, solid.width, solid.height)) {
                    
                    if (entity.vy > 0) { // Moving Down (Landing)
                        dy = solid.y - (entity.y + entity.height); // Push up
                        entity.y += dy;
                    } else if (entity.vy < 0) { // Moving Up (Hitting head)
                        dy = (solid.y + solid.height) - entity.y; // Push down
                        entity.y += dy;
                    }
                    entity.vy = 0; // Stop vertical movement
                }
                
                // --- Resolution on X-axis (Horizontal Collision) ---
                // If collision still exists or occurred horizontally
                if (isColliding(entity.x, entity.y, entity.width, entity.height,
                                solid.x, solid.y, solid.width, solid.height)) {

                    if (entity.vx > 0) { // Moving Right
                        dx = solid.x - (entity.x + entity.width); // Push left
                        entity.x += dx;
                    } else if (entity.vx < 0) { // Moving Left
                        dx = (solid.x + solid.width) - entity.x; // Push right
                        entity.x += dx;
                    }
                    entity.vx = 0; // Stop horizontal movement
                }
                
                // Inform both entities about the collision
                entity.onCollide(solid, dx, dy);
                solid.onCollide(entity, -dx, -dy);
            }
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        this.entities
            .sort((a, b) => a.z - b.z)
            .forEach(e => e.render(ctx));
    }
                                 }
