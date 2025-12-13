ShipFast Engine

A small, fast, beginner‑friendly TypeScript game engine for web games.

ShipFast is intentionally minimal: no ECS, no physics engine, no heavy abstractions. It’s designed so you can read the whole engine, understand it, and ship games quickly.


---

✨ Features

TypeScript + ES Modules

Deterministic game loop (dt in seconds)

Scene system with lifecycle hooks

Simple entity model with z‑ordering

Keyboard + touch input

Asset manager for images

Canvas 2D renderer

Mobile‑friendly by default



---

🚀 Quick Start

npm install
npm run dev

Open the local Vite URL in your browser.


---

📁 Project Structure

shipfast-engine/
├── src/              # Engine core
├── templates/        # Starter game templates
├── main.ts           # Entry point
├── index.html        # Canvas host


---

🎮 Creating a Game

1. Create a Scene

import { Scene } from './src/core/Scene';

export class MyScene extends Scene {
  onEnter() {
    // Setup entities, load assets
  }

  update(dt: number) {
    // Game logic
  }

  render(ctx: CanvasRenderingContext2D) {
    // Optional custom rendering
  }
}

Scenes control game flow. You can swap scenes at any time (menus, levels, game over, etc).


---

2. Add Entities

import { Entity } from './src/core/Entity';

const player = new Entity({ x: 100, y: 100, z: 1 });

player.update = (dt) => {
  player.x += 100 * dt;
};

scene.add(player);

Entities are intentionally lightweight:

Position (x, y)

Optional update(dt)

Optional render(ctx)

Z‑order for draw sorting


No inheritance trees. No hidden magic.


---

3. Start the Engine

import { Engine } from './src/core/Engine';
import { MyScene } from './MyScene';

const engine = new Engine();
engine.start(new MyScene());

That’s it. Your game is running.


---

🧠 Design Philosophy

ShipFast is built around a few simple ideas:

Read the engine — the entire core fits in a small codebase

Own your game logic — no forced patterns

Fast iteration — reload, tweak, ship

Beginner‑friendly, not beginner‑limited


If you understand JavaScript and Canvas, you can understand ShipFast.


---

📦 Templates

The templates/ folder contains ready‑to‑use starter projects:

Endless runner

Match‑3

Top‑down arcade


Templates are optional — ShipFast itself stays minimal.


---

🌍 Target Platforms

Desktop browsers

Mobile browsers (touch‑first)

Progressive Web Apps (PWA‑ready)



---

📜 License

MIT License — use it, modify it, ship it.


---

❤️ Why ShipFast?

Because sometimes you don’t want an engine that does everything.

You want one that lets you finish the game.

Ship fast. 🚢
