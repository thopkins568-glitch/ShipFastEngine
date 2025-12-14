// src/core/Scene.ts

import { Entity } from './Entity';
import { ParticleEffect } from '../../templates/starter/ParticleEffect';

export class Scene {
    public entities: Entity[] = [];
    public name: string = '';

    public addEntity(entity: Entity): void {
        this.entities.push(entity);

        if ('setScene' in entity && typeof (entity as any).setScene === 'function') {
            (entity as any).setScene(this);
        }
    }

    public removeEntity(entity: Entity): void {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities.splice(index, 1);
        }
    }

    public addParticleEffect(
        x: number,
        y: number,
        type: string = 'sparkle'
    ): void {
        const effect = ParticleEffect.create(x, y, type);
        this.addEntity(effect);
    }

    public getOverlap(entity: Entity): Entity[] {
        return this.entities.filter(
            e => e !== entity && this.checkOverlap(entity, e)
        );
    }

    private checkOverlap(a: Entity, b: Entity): boolean {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    public isColliding(entity: Entity): boolean {
        return this.entities.some(
            e => e !== entity && e.isSolid && this.checkOverlap(entity, e)
        );
    }

    public getSolidCollision(entity: Entity): { entity: Entity } | null {
        for (const e of this.entities) {
            if (e !== entity && e.isSolid && this.checkOverlap(entity, e)) {
                return { entity: e };
            }
        }
        return null;
    }
}
