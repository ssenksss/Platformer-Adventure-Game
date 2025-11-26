import { createWorld } from './src/ecs/world.js';
import { run } from './src/ecs/runner.js';
import { gameLoop } from './src/game/game.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const world = createWorld();

run(world, (deltaTime) => {
    gameLoop(world, ctx, deltaTime);
});
