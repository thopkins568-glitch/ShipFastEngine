// templates/starter/StarterScene.ts

import { Scene } from '../../src/core/Scene';
import { PlayerEntity } from './PlayerEntity';
import { GroundEntity } from './GroundEntity';
import { CollectibleEntity, CollectibleType } from './CollectibleEntity';

const GROUND_SIZE = 64;
const COLLECTIBLE_HEIGHT = 32;

const platforms = [
    { x: 0, y: 500, tiles: 15 },
    { x: 300, y: 350, tiles: 4 },
    { x: 600, y: 200, tiles: 3 },
];

const collectibles = [
    { x: 150, platformY: 500, type: CollectibleType.Coin },
    { x: 250, platformY: 500, type: CollectibleType.Coin },
    { x: 350, platformY: 500, type: CollectibleType.Coin },

    { x: 332, platformY: 350, type: CollectibleType.Gem },
    { x: 432, platformY: 350, type: CollectibleType.Gem },

    { x: 664, platformY: 200, type: CollectibleType.PowerUp },
    { x: 764, platformY: 200, type: CollectibleType.Key },

    { x: 50, y: 100, type: CollectibleType.Health },
];

export class StarterScene extends Scene {
    constructor() {
        super();
        this.name = 'StarterScene';
    }

    public initialize(engine: any): void {
        engine.assetManager.loadAsset('player_run', 'templates/starter/assets/player_run.png');
        engine.assetManager.loadAsset('ground', 'templates/starter/assets/ground.png');
        engine.assetManager.loadAsset('coin', 'templates/starter/assets/coin.png');
        engine.assetManager.loadAsset('gem', 'templates/starter/assets/gem.png');
        engine.assetManager.loadAsset('powerup', 'templates/starter/assets/powerup.png');
        engine.assetManager.loadAsset('key', 'templates/starter/assets/key.png');
        engine.assetManager.loadAsset('health', 'templates/starter/assets/health.png');
        engine.assetManager.loadAsset('sparkle', 'templates/starter/assets/sparkle.png');

        this.addEntity(new PlayerEntity(100, 100));

        platforms.forEach(p => {
            for (let i = 0; i < p.tiles; i++) {
                this.addEntity(
                    new GroundEntity(
                        p.x + i * GROUND_SIZE,
                        p.y,
                        GROUND_SIZE,
                        GROUND_SIZE
                    )
                );
            }
        });

        collectibles.forEach(c => {
            const y =
                c.platformY !== undefined
                    ? c.platformY - COLLECTIBLE_HEIGHT
                    : c.y!;
            this.addEntity(new CollectibleEntity(c.x, y, c.type));
        });
    }
}
