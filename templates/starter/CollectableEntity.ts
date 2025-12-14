// templates/starter/CollectibleEntity.ts

import { Entity } from '../../src/core/Entity';
import { Scene } from '../../src/core/Scene';
import { ParticleEffect } from './ParticleEffect';

export enum CollectibleType { Coin, Gem }

const ASSET_KEYS = {
    [CollectibleType.Coin]: 'coin',
    [CollectibleType.Gem]: 'gem',
};

export interface CollectibleConfig {
    type: CollectibleType;
    value: number;
}

export class CollectibleEntity extends Entity {
    private bobTimer: number = 0;
    private bobPeriod: number = 1000;

    constructor(private cfg: CollectibleConfig, x: number, y: number) {
        super(ASSET_KEYS[cfg.type], x, y, 32, 32);
        this.isSolid = false;
        this.tag = 'collectible';
        this.bobTimer = Math.random() * this.bobPeriod;
    }

    public update(dt: number, scene: Scene): void {
        this.bobTimer += dt;
        this.y += Math.sin((this.bobTimer / this.bobPeriod) * Math.PI * 2) * 0.5;
    }

    public onPickup(scene: Scene): void {
        scene.addParticleEffect(this.x + this.width / 2, this.y + this.height / 2, 'sparkle');
        this._shouldRemove = true;
    }
}
