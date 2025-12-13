export abstract class Entity {
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    width = 0;
    height = 0;
    z = 0;

    update(dt: number) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }

    abstract render(ctx: CanvasRenderingContext2D): void;
}
