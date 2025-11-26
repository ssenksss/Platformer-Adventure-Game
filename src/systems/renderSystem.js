// src/systems/renderSystem.js
import { assets } from '../game/assets.js';

const images = {};

// Učitaj slike
Object.entries(assets).forEach(([key, src]) => {
    const img = new Image();
    img.src = src;
    images[key] = img;
});

export const renderSystem = (ctx, entities, components, camera) => {
    // --- Background ---
    if (images.background.complete) {
        ctx.drawImage(images.background, 0, 0, ctx.canvas.width, ctx.canvas.height);
    } else {
        ctx.fillStyle = 'skyblue';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    // --- Entities ---
    entities.forEach(id => {
        const pos = components.position[id];
        const rend = components.renderable[id];
        if (pos && rend) {
            let img;

            if (components.playerTag?.[id]) img = images.player;
            else if (components.enemyTag?.[id]) img = images.enemy;
            else if (components.collectible?.[id]) img = images.coin;
            else if (components.platformTag?.[id]) img = images.platform;

            if (img?.complete) {
                ctx.drawImage(img, pos.x - camera.x, pos.y - camera.y, rend.width, rend.height);
            } else {
                // fallback
                ctx.fillStyle = rend.color;
                ctx.fillRect(pos.x - camera.x, pos.y - camera.y, rend.width, rend.height);
            }
        }
    });
};
