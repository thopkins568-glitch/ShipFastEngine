import { Entity } from './Entity';

export class Scene {
    private entities: Entity[] = [];

    onStart?(): void;
    onEnd?(): void;

    addEntity(entity: Entity): void {
        this.entities.push(entity);
    }

    update(dt: number): void {
        for (const e of [...this.entities]) {
            if (e.active) e.update(dt);
        }
        this.entities = this.entities.filter(e => !e.markedForRemoval);
    }

    render(ctx: CanvasRenderingContext2D): void {
        [...this.entities]
            .sort((a, b) => a.z - b.z)
            .forEach(e => e.active && e.render(ctx));
    }
}
