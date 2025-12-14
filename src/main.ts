import { Engine } from './core/Engine';
import { Scene } from './core/Scene';
import { Entity } from './core/Entity';

class Ball extends Entity {
    x = 100;
    y = 100;
    vx = 200;
    vy = 150;
    r = 20;

    constructor(private engine: Engine) {
        super();
    }

    update(dt: number) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        const w = window.innerWidth;
        const h = window.innerHeight;

        if (this.x < this.r || this.x > w - this.r) this.vx *= -1;
        if (this.y < this.r || this.y > h - this.r) this.vy *= -1;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
}

class GameScene extends Scene {
    constructor(private engine: Engine) {
        super();
    }

    onStart() {
        this.addEntity(new Ball(this.engine));
    }
}

const engine = new Engine();
engine.setScene(new GameScene(engine));
engine.start();
