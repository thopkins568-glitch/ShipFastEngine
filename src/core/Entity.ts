export abstract class Entity {
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    width = 0;
    height = 0;
    z = 0;
    isSolid = false;        // New: If true, other entities can collide with it
    isGrounded = false;     // New: Tracks if the entity is resting on a solid surface

    update(dt: number) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        
        // Assume not grounded until collision resolution proves otherwise
        this.isGrounded = false; 
    }

    /**
     * Hook called when a collision is detected with a solid entity.
     * @param other The entity collided with.
     * @param dx The x-displacement applied during resolution.
     * @param dy The y-displacement applied during resolution.
     */
    onCollide(other: Entity, dx: number, dy: number): void {
        // Only set grounded state if we hit a solid entity from the top (pushed up)
        if (other.isSolid && dy < 0) {
            this.isGrounded = true;
        }
    }

    abstract render(ctx: CanvasRenderingContext2D): void;
}
