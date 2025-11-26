const backgroundImage = new Image();
backgroundImage.src = './src/game/background.png'; // od index.html
let bgLoaded = false;

backgroundImage.onload = () => {
    bgLoaded = true;
};

export const renderSystem = (ctx, entities, components, camera) => {
    if (bgLoaded) {
        ctx.drawImage(backgroundImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
    } else {
        ctx.fillStyle = 'skyblue';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    entities.forEach(id => {
        const pos = components.position[id];
        const rend = components.renderable[id];
        if (pos && rend) {
            ctx.fillStyle = rend.color;
            ctx.fillRect(pos.x - camera.x, pos.y - camera.y, rend.width, rend.height);
        }
    });
};
