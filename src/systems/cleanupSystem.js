export const cleanupSystem = (entities, components) => {
    // Samo setujemo collected flag, ne diramo entities ovde
    Object.entries(components.collectible || {}).forEach(([id, coin]) => {
        if (coin.collected) {
            // ništa se ne radi sa entities odmah
            // entitet će biti uklonjen kasnije u gameLoop
        }
    });
};
