//primenjuje gravitaciju,i nacin njene promene
export const physicsSystem = (entities, components, delta) => {
    const gravity = 800;

    entities.forEach(id => {
        if (components.playerTag?.[id] && components.velocity[id] && components.position[id]) {
            components.velocity[id].y += gravity * delta;
            components.position[id].x += components.velocity[id].x * delta;
            components.position[id].y += components.velocity[id].y * delta;
        }
    });
};
