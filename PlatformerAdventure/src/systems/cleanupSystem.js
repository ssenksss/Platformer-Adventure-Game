//prolazi kroz sve collectible entitete
export const cleanupSystem = (entities, components) => {
    Object.entries(components.collectible || {}).forEach(([id, coin]) => {
        if (coin.collected) {
            //samo ih oznacava, kasnije ce biti sklonjeni u gameloop-u
        }
    });
};
