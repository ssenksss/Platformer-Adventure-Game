//proverava da li je igrac na platformi
export const collisionSystem = (entities, components) => {
    const players = entities.filter(id => components.playerTag?.[id]);//bira igrace
    const platforms = entities.filter(id => components.platformTag?.[id]);//bira platforme
    const margin = 5;

    players.forEach(pid => {
        components.grounded[pid] = false;//pretpostavlja da nije za zemlji

        const pPos = components.position[pid];
        const pCol = components.collider[pid];

        platforms
            .map(plid => ({
                pos: components.position[plid],
                col: components.collider[plid]
            })) 
            .filter(pl => pl.pos && pl.col) 
            .forEach(pl => {
                const playerBottom = pPos.y + pCol.height;
                const platformTop = pl.pos.y;

                const overlapX = 
                      pPos.x + pCol.width > pl.pos.x &&
                      pPos.x < pl.pos.x + pl.col.width;//horizontalna kolizija

                if (overlapX &&
                    playerBottom > platformTop - margin &&
                    playerBottom <= platformTop + 50) {
                    
                    pPos.y = platformTop - pCol.height;
                    components.velocity[pid].y = 0;
                    components.grounded[pid] = true; //vertikalna kolizija
                }
            });
    });
};
