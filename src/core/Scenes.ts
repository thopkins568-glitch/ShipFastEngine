// src/core/Scene.ts

import { Entity } from './Entity';
import { ParticleEffect } from '../../templates/starter/ParticleEffect';

export class Scene {
    public entities: Entity[] = [];
    public name: string = '';
    public canvas: HTMLCanvasElement;

    constructor(canvas?: HTMLCanvasElement) {
        this.canvas = canvas || document.createElement('canvas');
    }

    public addEntity(entity: Entity): void {
        this.entities.push(entity);
        if ('setScene' in entity && typeof (entity as any).setScene === 'function') {
            (entity as any).setScene(this);
        }
    }

    public removeEntity(entity: Entity): void {
        const index = this.entities.indexOf(entity);
        if (index !== -1) this.entities.splice(index, 1);
    }

    public addParticleEffect(x: number, y: number, effectType: string = 'sparkle'): void {
        const effect = ParticleEffect.create(x, y, effectType);
        this.addEntity(effect);
    }

    public getOverlappingEntities(entity: Entity): Entity[] {
        return this.entities.filter(e => e !== entity && this.checkCollision(entity, e));
    }

    private checkCollision(a: Entity, b: Entity): boolean {
        return !(
            a.x + a.width < b.x ||
            a.x > b.x + b.width ||
            a.y + a.height < b.y ||
            a.y > b.y + b.height
        );
    }

    public getCanvasBounds(): { width: number; height: number } {
        return { width: this.canvas.width, height: this.canvas.height };
    }

    public findEntityByTag(tag: string): Entity | undefined {
        return this.entities.find(e => e.tag === tag);
    }

    public update(dt: number): void {
        const entitiesToUpdate = [...this.entities];
        for (const entity of entitiesToUpdate) {
            if (!entity._shouldRemove) entity.update(dt, this);
        }

        this.entities = this.entities.filter(e => !e._shouldRemove);
    }

    public render(ctx: CanvasRenderingContext2D, assets: any): void {
        for (const entity of this.entities) {
            entity.render(ctx, assets);
        }
    }
}
