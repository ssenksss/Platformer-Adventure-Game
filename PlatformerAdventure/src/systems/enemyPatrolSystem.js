//kontrolise kretanje neprijatelja po platformi
export const enemyPatrolSystem = (entities, components, delta) => {
    const speed = 100;

    entities
        .filter(id => components.enemyTag?.[id]) // bira samo entitete sa enemyTag-om
        .map(id => {                              
            if (!components.direction) components.direction = {};
            if (components.direction[id] === undefined) components.direction[id] = 1;//inicijalizuje smer kretanja

            return id;
        })
        .forEach(id => {
            const pos = components.position[id];
            const col = components.collider[id];
            let onPlatformAhead = false;

            Object.entries(components.platformTag || {})
                .filter(([pid]) => components.position[pid] && components.collider[pid]) 
                .forEach(([pid]) => {
                    const plPos = components.position[pid];
                    const plCol = components.collider[pid];

                    const nextX = pos.x + (components.direction[id] > 0 ? col.width + 1 : -1);
                    const feetY = pos.y + col.height;

                    const onX = nextX >= plPos.x && nextX <= plPos.x + plCol.width;
                    const onY = feetY >= plPos.y && feetY <= plPos.y + plCol.height;//osigurava da ne padne 

                    if (onX && onY) onPlatformAhead = true;
                });

            if (!onPlatformAhead) components.direction[id] *= -1;
            pos.x += speed * components.direction[id] * delta; //pomera entitet
        });
};
