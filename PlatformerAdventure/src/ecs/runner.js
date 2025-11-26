
export const run = (world, callback) => {  //callback izvrsava sve sisteme(collision,physics...)
    let last = 0;
    const loop = (timestamp) => {
        const delta = (timestamp - last) / 1000;
        last = timestamp;
        callback(delta);
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop); 
};
