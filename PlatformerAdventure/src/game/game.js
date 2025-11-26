//main fajl
import { createEntity } from '../ecs/entity.js';
import { createPosition } from '../components/position.js';
import { createVelocity } from '../components/velocity.js';
import { createRenderable } from '../components/renderable.js';
import { createCollider } from '../components/collider.js';
import { createPlayerTag } from '../components/playerTag.js';
import { createCamera } from '../components/camera.js';
import { spawnLevelSystem } from '../systems/spawnLevelSystem.js';
import { physicsSystem } from '../systems/physicsSystem.js';
import { playerControlSystem } from '../systems/playerControlSystem.js';
import { collisionSystem } from '../systems/collisionSystem.js';
import { enemyPatrolSystem } from '../systems/enemyPatrolSystem.js';
import { renderSystem } from '../systems/renderSystem.js';
import { cameraSystem } from '../systems/cameraSystem.js';
import { cleanupSystem } from '../systems/cleanupSystem.js';
import { levels } from './levels.js';
import { inputSystem } from '../systems/inputSystem.js';
import { assets } from './assets.js'; 


let currentLevel = 0;
let camera = createCamera();
let playerId = null;
let score = 0;
let nextLevelTimer = 0;

export const gameLoop = (world, ctx, delta) => {
    const { keys, consume } = inputSystem;

    if (world.entities.length === 0 && !world.gameOver) { 
        playerId = createEntity();                          //kreira novog igraca
        world.entities.push(playerId);

        world.components.position[playerId] = createPosition(150, 500);
        world.components.velocity[playerId] = createVelocity();
        world.components.renderable[playerId] = createRenderable(assets.player, 32, 32);
        world.components.collider[playerId] = createCollider(32, 32);
        world.components.playerTag[playerId] = createPlayerTag();

        spawnLevelSystem(world, levels[currentLevel]);      //kreira level(platforme,igrace,novcice..)

        if (nextLevelTimer > 0) return;
    }

    if (!world.gameOver) {
        
        enemyPatrolSystem(world.entities, world.components, delta);         //pozivanje sistema za upravljanje logikom
        playerControlSystem(world.entities, world.components, delta, keys);
        physicsSystem(world.entities, world.components, delta);
        collisionSystem(world.entities, world.components);
        cleanupSystem(world.entities, world.components);
        cameraSystem(camera, playerId, world.components);

        world.entities.forEach(id => {      //prikupljanje novcica 
            if (world.components.collectible?.[id] && world.components.position[id] && world.components.collider[id]) {
                const pPos = world.components.position[playerId];
                const pCol = world.components.collider[playerId];
                const cPos = world.components.position[id];
                const cCol = world.components.collider[id];

                if (pPos.x < cPos.x + cCol.width &&
                    pPos.x + pCol.width > cPos.x &&
                    pPos.y < cPos.y + cCol.height &&
                    pPos.y + pCol.height > cPos.y) {
                    world.components.collectible[id].collected = true;
                    score += 10;
                }
            }
        });

        world.entities = world.entities.filter(id => !world.components.collectible?.[id]?.collected);//uklanjanje novcica iz sveta
        Object.keys(world.components.collectible || {}).forEach(id => {
            if (world.components.collectible[id].collected) {
                delete world.components.collectible[id];
                delete world.components.position[id];
                delete world.components.renderable[id];
                delete world.components.collider[id];
            }
        });

        world.entities.forEach(eid => {         //kolizija sa neprijateljem, ubistvo neprijatelj/igraca
            if(world.components.enemyTag?.[eid] && world.components.position[eid] && world.components.collider[eid]){
                const ePos = world.components.position[eid];
                const eCol = world.components.collider[eid];
                const pPos = world.components.position[playerId];
                const pCol = world.components.collider[playerId];

                const overlapX = pPos.x < ePos.x + eCol.width && pPos.x + pCol.width > ePos.x;
                const overlapY = pPos.y < ePos.y + eCol.height && pPos.y + pCol.height > ePos.y;

                if(overlapX && overlapY){
                    const prevBottom = pPos.y + pCol.height - (world.components.velocity[playerId]?.y || 0) * delta;

                    if(prevBottom <= ePos.y){
                        world.entities = world.entities.filter(id => id !== eid);
                        delete world.components.enemyTag[eid];
                        delete world.components.position[eid];
                        delete world.components.collider[eid];
                        delete world.components.renderable[eid];

                        world.components.velocity[playerId].y = -300;
                        score += 50;
                    } else { 
                        world.gameOver = true;
                    }
                }
            }
        });

        const playerPos = world.components.position[playerId];
        if (playerPos && playerPos.y > 700) world.gameOver = true;  //pad ispod nivoa -> gameOver

       
        const levelComplete = !world.entities.some(id => // ukoliko nema neprijatelja i ako su prikupljeni novcici, nivo je zavrsen
            world.components.enemyTag?.[id] || world.components.collectible?.[id]
        );

        if (levelComplete) {
            currentLevel++;
            if (currentLevel >= levels.length) {
                world.gameOver = true;
                world.win = true;
            } else {
                world.entities = [];
                world.components = {
                    position: {},
                    velocity: {},
                    renderable: {},
                    collider: {},
                    playerTag: {},
                    platformTag: {},
                    collectible: {},
                    enemyTag: {},
                    grounded: {}
                };
                playerId = null;
                nextLevelTimer = 60;
            }
        }
    }


renderSystem(ctx, world.entities, world.components, camera);    //renderovanje svih entiteta prema kameri


if (nextLevelTimer > 0) {
 
    ctx.fillStyle = 'rgba(0,0,0,0.5)';      //ekran za next lvl
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`NEXT LEVEL ${currentLevel + 1}`, ctx.canvas.width / 2, ctx.canvas.height / 2);

    nextLevelTimer--; 
} 

else if (!world.gameOver) {     //prikazuje score i lvl
    document.getElementById('hud').innerText = `Score: ${score} | Level: ${currentLevel + 1}`;
}


if (world.gameOver) {                    //gameOver/win ekran
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';

    if (world.win) {
        ctx.fillText('YOU WIN!', ctx.canvas.width / 2, ctx.canvas.height / 2);
    } else {
        ctx.fillText('GAME OVER', ctx.canvas.width / 2, ctx.canvas.height / 2);
    }

    ctx.font = '24px Arial';
    ctx.fillText('Press R to Restart', ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);
}

                                            
    if (world.gameOver && consume('r')) {//ekran -> restart pritiskom R 
        currentLevel = 0;
        score = 0;
        world.gameOver = false;
        world.win = false;
        nextLevelTimer = 0;

        world.entities = [];
        world.components = {
            position: {},
            velocity: {},
            renderable: {},
            collider: {},
            playerTag: {},
            platformTag: {},
            collectible: {},
            enemyTag: {},
            grounded: {}
        };

        playerId = null;
        document.getElementById('hud').innerText = `Score: 0 | Level: 1`;
    }
};
