export const enemyPatrolSystem = (entities, components, delta) => {
    const speed = 100;

    entities.forEach(id => {
        if (components.enemyTag?.[id] && components.position[id] && components.collider[id]) {

            if (!components.direction) components.direction = {};
            if (components.direction[id] === undefined) components.direction[id] = 1;

            const pos = components.position[id];
            const col = components.collider[id];

            // Provera platforme ispred enemy-ja
            let onPlatformAhead = false;

            Object.entries(components.platformTag || {}).forEach(([pid]) => {
                const plPos = components.position[pid];
                const plCol = components.collider[pid];

                if (plPos && plCol) {
                    const nextX = pos.x + (components.direction[id] > 0 ? col.width + 1 : -1);
                    const feetY = pos.y + col.height;

                    const onX = nextX >= plPos.x && nextX <= plPos.x + plCol.width;
                    const onY = feetY >= plPos.y && feetY <= plPos.y + plCol.height;

                    if (onX && onY) onPlatformAhead = true;
                }
            });

            // Okretanje kada nema platforme ispred
            if (!onPlatformAhead) components.direction[id] *= -1;

            // Direktno pomeranje enemy-ja
            pos.x += speed * components.direction[id] * delta;
        }
    });
};
