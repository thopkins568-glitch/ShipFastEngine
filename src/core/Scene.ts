import { Entity } from './Entity.js';

export class Scene {
    protected entities: Entity[] = [];

    onEnter(): void {}
    onExit(): void {}

    addEntity(entity: Entity) {
        this.entities.push(entity);
    }

    update(dt: number) {
        for (const e of this.entities) e.update(dt);
    }

    render(ctx: CanvasRenderingContext2D) {
        this.entities
            .sort((a, b) => a.z - b.z)
            .forEach(e => e.render(ctx));
    }
}
