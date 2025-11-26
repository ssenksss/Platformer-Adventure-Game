export const playerControlSystem = (entities, components, delta, keys) => {
    entities.forEach(id => {
        if (components.playerTag?.[id] && components.velocity[id]) {
            // horizontalni pokret
            components.velocity[id].x = keys['arrowleft'] ? -200 : keys['arrowright'] ? 200 : 0;

            // skok samo ako grounded
            if (keys['arrowup'] && components.grounded[id]) {
                components.velocity[id].y = -600;
                components.grounded[id] = false;
            }
        }
    });
};
