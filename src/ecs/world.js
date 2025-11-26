export const createWorld = () => ({
    entities: [],
    components: {
        position: {},
        velocity: {},
        renderable: {},
        collider: {},
        playerTag: {},
        platformTag: {},
        collectible: {},
        enemyTag: {},
        grounded: {}
    },
    systems: [],
    gameOver: false,
    win: false
});

export const addSystem = (world, system) => ({
    ...world,
    systems: [...world.systems, system]
});
