export const collisionSystem = (entities, components) => {
    const playerIds = entities.filter(id => components.playerTag?.[id]);
    const platforms = entities.filter(id => components.platformTag?.[id]);
    const margin = 5;

    playerIds.forEach(pid => {
        if (!components.grounded) components.grounded = {};
        components.grounded[pid] = false;

        const pPos = components.position[pid];
        const pCol = components.collider[pid];

        platforms.forEach(plid => {
            const plPos = components.position[plid];
            const plCol = components.collider[plid];

            if (
                pPos.x + pCol.width > plPos.x &&
                pPos.x < plPos.x + plCol.width
            ) {
                const playerBottom = pPos.y + pCol.height;
                const platformTop = plPos.y;

                if (playerBottom > platformTop - margin && playerBottom <= platformTop + 50) {
                    pPos.y = platformTop - pCol.height;
                    components.velocity[pid].y = 0;
                    components.grounded[pid] = true;
                }
            }
        });
    });
};
