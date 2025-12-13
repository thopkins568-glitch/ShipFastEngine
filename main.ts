import { Engine } from './src/core/Engine.js';
import { AssetManager } from './src/render/AssetManager.js';
import { StarterScene } from './templates/starter/StarterScene.js';

async function bootstrap() {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 450;

    await Promise.all([
        AssetManager.loadTexture('player_run', './templates/starter/assets/player_run.png'),
        AssetManager.loadTexture('ground_tile', './templates/starter/assets/ground.png')
    ]);

    const engine = new Engine(canvas);
    engine.setScene(new StarterScene(canvas.width, canvas.height));
    engine.start();
}

bootstrap();
