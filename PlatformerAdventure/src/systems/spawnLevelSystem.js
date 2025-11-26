//za stvaranje nivoa
import { createEntity } from '../ecs/entity.js';
import { createPosition } from '../components/position.js';
import { createRenderable } from '../components/renderable.js';
import { createCollider } from '../components/collider.js';
import { createPlatformTag } from '../components/platformTag.js';

export const spawnLevelSystem = (world, levelData) => {
    if (!levelData) return;

    levelData.platforms?.forEach(p => {
        const id = createEntity();
        world.entities.push(id);
        world.components.position[id] = createPosition(p.x, p.y);
        world.components.renderable[id] = createRenderable('green', p.width, p.height);
        world.components.collider[id] = createCollider(p.width, p.height);
        world.components.platformTag[id] = createPlatformTag();
    });

    levelData.coins?.forEach(c => {
        const id = createEntity();
        world.entities.push(id);
        world.components.position[id] = createPosition(c.x, c.y);
        world.components.renderable[id] = createRenderable('yellow',16,16);
        world.components.collider[id] = createCollider(16,16);
        world.components.collectible[id] = { type: 'coin', collected: false };
    });

    levelData.enemies?.forEach(e => {
        const id = createEntity();
        world.entities.push(id);
        world.components.position[id] = createPosition(e.x, e.y);
        world.components.renderable[id] = createRenderable('red',32,32);
        world.components.collider[id] = createCollider(32,32);
        world.components.enemyTag[id] = { type: 'enemy' };
    });
};
