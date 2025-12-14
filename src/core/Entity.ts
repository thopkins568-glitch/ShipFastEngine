export class Entity {
    active = true;
    z = 0;
    markedForRemoval = false;

    constructor(z = 0) {
        this.z = z;
    }

    update(_dt: number): void {}
    render(_ctx: CanvasRenderingContext2D): void {}

    destroy(): void {
        this.markedForRemoval = true;
    }
}
