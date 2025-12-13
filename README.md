ShipFast Engine

A small, fast, beginner-friendly TypeScript game engine for web games.

ShipFast is intentionally minimal: no ECS, no physics engine, no heavy abstractions. It’s designed so you can read the whole engine, understand it, and ship games quickly.


---

Features

TypeScript + ES modules

Deterministic game loop (dt in seconds)

Scene system with lifecycle hooks

Simple entity model with z-ordering

Keyboard + touch input

Asset manager for images

Canvas 2D renderer

Mobile-friendly by default



---

Quick Start

npm install
npm run dev

Open the local Vite URL in your browser.


---

Project Structure

shipfast-engine/
├── src/              # Engine core
├── templates/        # Starter game templates
├── main.ts           # Entry point
├── index.html        # Canvas host


---

Creating a Game

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


---

2. Add Entities

import { Entity } from './src/core/Entity';

const player = new Entity({ x: 100, y: 100, z: 1 });
player.update = (dt) => {
  player.x += 100 * dt;
};

scene.add(player);

Entities are intentionally lightweight:

Position

Optional update()

Optional render()

Z-order for draw sorting



---

3. Start the Engine

import { Engine } from './src/core/Engine';
import { MyScene } from './MyScene# ShipFastEngine
